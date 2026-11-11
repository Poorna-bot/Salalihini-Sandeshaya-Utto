"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction, Effect } from "postprocessing";
import * as THREE from "three";
import { THEMES, nightOf } from "@/lib/themes";
import { useJourney } from "@/lib/useJourney";
import { useCalm } from "./CalmContext";
import { markReady } from "@/lib/loading";
import { shared, makeMat } from "@/lib/kit";
import {
  buildPalaceCluster,
  buildThreeTierShrine,
  buildStupaWithBoTree,
  buildKovil,
  buildPalmGrove,
  buildMountainRange
} from "@/lib/models";
import type { Silhouette, ThemeId } from "@/data/types";

const DITHER_FRAGMENT = /* glsl */ `
uniform float uTime;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float n = fract(sin(dot(uv * 1024.0 + fract(uTime * 0.13), vec2(12.9898, 78.233))) * 43758.5453);
  vec3 dithered = inputColor.rgb + (n - 0.5) / 220.0;
  outputColor = vec4(dithered, inputColor.a);
}
`;

class DitherEffectImpl extends Effect {
  constructor() {
    super("DitherEffect", DITHER_FRAGMENT, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([["uTime", new THREE.Uniform(0)]])
    });
  }
}

function ReadySignal() {
  const signaled = useRef(false);
  useFrame(() => {
    if (!signaled.current) {
      signaled.current = true;
      markReady("scene");
    }
  });
  return null;
}

const SKY_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`;

const SKY_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uBottom;
uniform vec4 uSun;
uniform vec3 uSunColor;
uniform vec4 uMoon;
uniform float uTime;

void main() {
  float y = clamp(vUv.y, 0.0, 1.0);
  float m1 = smoothstep(0.0, 0.56, y);
  float m2 = smoothstep(0.42, 1.0, y);
  vec3 col = mix(uBottom, uMid, m1);
  col = mix(col, uTop, m2);

  vec2 p = vUv * 2.0 - 1.0;

  // Smooth sun disc & soft atmospheric glow
  if (uSun.w > 0.001) {
    float ds = length(p - uSun.xy);
    float glow = exp(-ds * (3.2 / max(0.12, uSun.z))) * uSun.w * 0.55;
    float disc = smoothstep(uSun.z * 0.32, uSun.z * 0.22, ds) * uSun.w * 0.85;
    col += uSunColor * (glow + disc);
  }

  // Smooth moon disc & halo
  if (uMoon.w > 0.001) {
    float dm = length(p - uMoon.xy);
    float mGlow = exp(-dm * 7.5) * uMoon.w * 0.38;
    float mDisc = smoothstep(uMoon.z, uMoon.z * 0.82, dm) * uMoon.w;
    col += vec3(0.92, 0.95, 1.0) * (mGlow + mDisc);
  }

  // Subtle sub-LSB dither to prevent any 8-bit banding
  float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (d - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

const WATER_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPos;
uniform float uTime;
void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y += sin(pos.x * 2.2 + uTime * 1.4) * 0.018 + cos(pos.z * 2.8 + uTime * 1.1) * 0.015;
  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const WATER_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vWorldPos;
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uAccent;
uniform float uTime;

void main() {
  float distEdge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  // Alpha fades cleanly to 0 over shallow shoreline so water never tints dry land
  float depthAlpha = smoothstep(0.02, 0.18, distEdge);
  float ripple = sin(vWorldPos.x * 6.5 + uTime * 2.1) * cos(vWorldPos.z * 7.0 - uTime * 1.6);
  float foam = smoothstep(0.16, 0.04, distEdge) * (0.45 + 0.35 * sin(vWorldPos.x * 9.0 + uTime * 2.4));
  vec3 waterCol = mix(uTop * 0.65, uBottom * 0.85, 0.45 + ripple * 0.08);
  waterCol += uAccent * (foam * 0.35 + max(0.0, ripple) * 0.08);
  gl_FragColor = vec4(waterCol, depthAlpha * 0.84);
}
`;

function ValleyWorld({
  themeId,
  silhouette,
  calmMode
}: {
  themeId: ThemeId;
  silhouette: Silhouette;
  calmMode: boolean;
}) {
  const firstFrame = useRef(true);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const groundMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const skyUniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color(THEMES.dawn.top) },
      uMid: { value: new THREE.Color(THEMES.dawn.mid) },
      uBottom: { value: new THREE.Color(THEMES.dawn.bottom) },
      uSun: { value: new THREE.Vector4(...THEMES.dawn.sun) },
      uSunColor: { value: new THREE.Color(THEMES.dawn.sunColor) },
      uMoon: { value: new THREE.Vector4(...THEMES.dawn.moon) },
      uTime: { value: 0 }
    }),
    []
  );

  const waterUniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color(THEMES.dawn.top) },
      uBottom: { value: new THREE.Color(THEMES.dawn.bottom) },
      uAccent: { value: new THREE.Color(THEMES.dawn.accent) },
      uTime: { value: 0 }
    }),
    []
  );

  // Tiny soft stars
  const starGeo = useMemo(() => {
    const count = 180;
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = 1.5 + Math.random() * 11;
      pos[i * 3 + 2] = -14 - Math.random() * 4;
      seed[i] = Math.random() * 6.28;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, []);

  const starUniforms = useMemo(
    () => ({
      uStars: { value: THEMES.dawn.stars },
      uTime: { value: 0 }
    }),
    []
  );

  // Small, sparse drifting particles (glow dots or petals)
  const particleCount = 36;
  const particleRef = useRef<THREE.Points>(null);
  const particleData = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const mixArr = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = -2 + Math.random() * 9;
      pos[i * 3 + 2] = -3 - Math.random() * 8;
      mixArr[i] = Math.random();
    }
    return { pos, mixArr };
  }, []);

  const particleUniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color(THEMES.dawn.particleA) },
      uColorB: { value: new THREE.Color(THEMES.dawn.particleB) },
      uDensity: { value: THEMES.dawn.density }
    }),
    []
  );

  // Build silhouette groups once
  const silhouettes = useMemo(() => {
    const city = buildPalaceCluster();
    const temple = buildThreeTierShrine();
    const stupa = buildStupaWithBoTree();
    const kovil = buildKovil();
    const palms = buildPalmGrove();
    const mountain = buildMountainRange();
    return { city, temple, stupa, kovil, palms, mountain };
  }, []);

  const groundMat = useMemo(() => {
    const m = makeMat({ color: THEMES.dawn.ground, roughness: 0.92 });
    groundMatRef.current = m;
    return m;
  }, []);

  useFrame((_, delta) => {
    const target = THEMES[themeId] ?? THEMES.dawn;
    const snap = firstFrame.current;
    firstFrame.current = false;

    const rate = snap ? 1.0 : Math.min(1.0, delta * 2.8);
    const dt = calmMode ? delta * 0.25 : delta;
    shared.time.value += dt;

    skyUniforms.uTop.value.lerp(new THREE.Color(target.top), rate);
    skyUniforms.uMid.value.lerp(new THREE.Color(target.mid), rate);
    skyUniforms.uBottom.value.lerp(new THREE.Color(target.bottom), rate);
    skyUniforms.uSunColor.value.lerp(new THREE.Color(target.sunColor), rate);

    const ts = new THREE.Vector4(...target.sun);
    const tm = new THREE.Vector4(...target.moon);
    skyUniforms.uSun.value.lerp(ts, rate);
    skyUniforms.uMoon.value.lerp(tm, rate);
    skyUniforms.uTime.value = shared.time.value;

    waterUniforms.uTop.value.copy(skyUniforms.uTop.value);
    waterUniforms.uBottom.value.copy(skyUniforms.uBottom.value);
    waterUniforms.uAccent.value.lerp(new THREE.Color(target.accent), rate);
    waterUniforms.uTime.value = shared.time.value;

    starUniforms.uStars.value += (target.stars - starUniforms.uStars.value) * rate;
    starUniforms.uTime.value = shared.time.value;

    particleUniforms.uColorA.value.lerp(new THREE.Color(target.particleA), rate);
    particleUniforms.uColorB.value.lerp(new THREE.Color(target.particleB), rate);
    particleUniforms.uDensity.value += (target.density - particleUniforms.uDensity.value) * rate;

    const targetNight = nightOf(target);
    shared.night.value += (targetNight - shared.night.value) * rate;
    shared.fogColor.value.lerp(new THREE.Color(target.ground), rate);
    shared.rimColor.value.lerp(new THREE.Color(target.accent), rate);

    if (groundMatRef.current) {
      groundMatRef.current.color.lerp(new THREE.Color(target.ground), rate);
    }
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(target.mid), rate);
    }
    if (dirLightRef.current) {
      dirLightRef.current.color.lerp(new THREE.Color(target.accent), rate);
    }

    // Drift particles gently
    if (particleRef.current) {
      const attr = particleRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let x = attr.getX(i) + Math.sin(shared.time.value * 0.9 + i) * target.sway * dt * 0.25;
        let y = attr.getY(i) + target.drift * dt * 1.4;
        if (y > 7) y = -2;
        if (y < -2) y = 7;
        if (x > 9) x = -9;
        if (x < -9) x = 9;
        attr.setXY(i, x, y);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <>
      <ReadySignal />
      <ambientLight ref={ambientRef} intensity={0.85} />
      <directionalLight ref={dirLightRef} position={[4, 8, 5]} intensity={1.35} />

      {/* Fullscreen smooth gradient sky */}
      <mesh frustumCulled={false} renderOrder={-10}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          vertexShader={SKY_VERT}
          fragmentShader={SKY_FRAG}
          uniforms={skyUniforms}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      {/* Tiny soft twinkling stars */}
      <points geometry={starGeo}>
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={starUniforms}
          vertexShader={`
            attribute float aSeed;
            varying float vTwinkle;
            uniform float uTime;
            void main() {
              vTwinkle = 0.55 + 0.45 * sin(uTime * 1.8 + aSeed * 6.28);
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 2.2;
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            varying float vTwinkle;
            uniform float uStars;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              float a = smoothstep(0.5, 0.05, d) * vTwinkle * uStars;
              gl_FragColor = vec4(0.95, 0.97, 1.0, a);
            }
          `}
        />
      </points>

      {/* Valley ridges */}
      <group position={[0, -2.35, -9.5]}>
        <mesh position={[-5.5, -0.3, -2]} rotation={[0, 0.3, 0]} material={groundMat}>
          <coneGeometry args={[5.5, 2.2, 6]} />
        </mesh>
        <mesh position={[5.8, -0.25, -2.5]} rotation={[0, -0.4, 0]} material={groundMat}>
          <coneGeometry args={[6.0, 2.4, 6]} />
        </mesh>
        <mesh position={[0, -0.55, 0.5]} material={groundMat}>
          <cylinderGeometry args={[9.5, 11, 0.65, 12]} />
        </mesh>

        {/* Active section silhouette */}
        <group position={[0, -0.22, 0.2]} scale={0.92}>
          <primitive object={silhouettes.city} visible={silhouette === "city"} />
          <primitive object={silhouettes.temple} visible={silhouette === "temple"} />
          <primitive object={silhouettes.stupa} visible={silhouette === "stupa"} />
          <primitive object={silhouettes.kovil} visible={silhouette === "kovil"} />
          <primitive object={silhouettes.palms} visible={silhouette === "palms"} />
          <primitive object={silhouettes.mountain} visible={silhouette === "mountain"} />
        </group>

        {/* Shallow-fading water plane in foreground valley */}
        <mesh position={[0, -0.2, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 5.5, 48, 24]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            vertexShader={WATER_VERT}
            fragmentShader={WATER_FRAG}
            uniforms={waterUniforms}
          />
        </mesh>
      </group>

      {/* Sparse small drifting particles */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.pos, 3]}
          />
          <bufferAttribute
            attach="attributes-aMix"
            args={[particleData.mixArr, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={particleUniforms}
          vertexShader={`
            attribute float aMix;
            varying float vMix;
            void main() {
              vMix = aMix;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = 3.2;
              gl_Position = projectionMatrix * mv;
            }
          `}
          fragmentShader={`
            varying float vMix;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uDensity;
            void main() {
              float d = length(gl_PointCoord - 0.5);
              float a = smoothstep(0.5, 0.08, d) * uDensity * 0.55;
              vec3 c = mix(uColorA, uColorB, vMix);
              gl_FragColor = vec4(c, a);
            }
          `}
        />
      </points>
    </>
  );
}

class PostFXBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function PostFX() {
  const dither = useMemo(() => new DitherEffectImpl(), []);
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.38} luminanceThreshold={0.72} luminanceSmoothing={0.4} />
      <Vignette eskil={false} offset={0.22} darkness={0.55} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.08} />
      <primitive object={dither} />
    </EffectComposer>
  );
}

export default function SceneRoot() {
  const { themeId, silhouette } = useJourney();
  const { calmMode } = useCalm();
  const [paused, setPaused] = React.useState(false);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={paused ? "never" : "always"}
        camera={{ position: [0, 0.4, 5.5], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ValleyWorld
          themeId={themeId}
          silhouette={silhouette}
          calmMode={calmMode}
        />
        <PostFXBoundary><PostFX /></PostFXBoundary>
      </Canvas>
    </div>
  );
}
