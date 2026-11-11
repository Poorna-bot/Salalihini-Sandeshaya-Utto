"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  MAP,
  LANDMARKS,
  SCENERY_LABELS,
  ROUTE_NODES,
  RIVER_POINTS,
  sampleTerrainHeight,
  verseToRouteFraction,
  coastX,
  type Landmark
} from "@/lib/geo";
import { createStarlingRig, animateStarlingRig } from "@/lib/myna";
import {
  buildPalaceCluster,
  buildThreeTierShrine,
  buildStupaWithBoTree,
  buildKovil,
  buildSapumalCavalcade,
  buildMountainRange,
  buildPalmGrove
} from "@/lib/models";
import { markReady } from "@/lib/loading";
import { useCalm } from "./CalmContext";

export type CameraMode = "overview" | "follow" | "free";

interface ProjectedPin {
  id: string;
  x: number;
  y: number;
  visible: boolean;
  birdDist: number;
}

function buildRouteCurve(): THREE.CatmullRomCurve3 {
  const pts = ROUTE_NODES.map(([x, z]) => {
    const h = sampleTerrainHeight(x, z);
    const alt = Math.max(h, 0.35) + 1.45;
    return new THREE.Vector3(x, alt, z);
  });
  return new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
}

function buildRiverCurve(): THREE.CatmullRomCurve3 {
  const pts = RIVER_POINTS.map(([x, z]) => new THREE.Vector3(x, 0.06, z));
  return new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.5);
}

function MapWorld({
  verse,
  selectedLandmark,
  cameraMode,
  calmMode,
  dragOffset,
  zoomDistance,
  onProjectPins
}: {
  verse: number;
  selectedLandmark: Landmark | null;
  cameraMode: CameraMode;
  calmMode: boolean;
  dragOffset: { x: number; z: number };
  zoomDistance: number;
  onProjectPins: (pins: Record<string, ProjectedPin>) => void;
}) {
  const { camera, size } = useThree();
  const signaled = useRef(false);
  const firstFrame = useRef(true);
  const starling = useMemo(() => createStarlingRig(true), []);
  const routeCurve = useMemo(() => buildRouteCurve(), []);
  const riverCurve = useMemo(() => buildRiverCurve(), []);
  const waterRef = useRef<THREE.Mesh>(null);

  // Build 250 x 176 height-field terrain with lush Sri Lankan topographic coloring
  const terrainGeo = useMemo(() => {
    const g = new THREE.PlaneGeometry(MAP.width, MAP.depth, MAP.segX, MAP.segZ);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = sampleTerrainHeight(x, z);
      pos.setY(i, h);

      if (h < -0.15) {
        c.set("#041c38"); // seabed / deep river trench
      } else if (h < 0.06) {
        c.set("#0d5c75"); // shallow lagoon / riverbank shallows
      } else if (h < 0.24) {
        c.set("#d9c282"); // golden sandy beach & river sandbanks
      } else if (h < 0.55) {
        // Paddy field belt near Guruluketa / Veralana
        if (x > -3.5 && x < 2.5 && z > -4.8 && z < 1.2) {
          c.set("#2d8a56");
        } else {
          c.set("#195e47"); // lush emerald coastal plains
        }
      } else if (h < 1.5) {
        c.set("#1f7252"); // tropical forest canopy
      } else if (h < 3.4) {
        c.set("#2b5848"); // central highlands
      } else if (h < 5.6) {
        c.set("#435d73"); // mountain rock faces
      } else {
        c.set("#89c2d9"); // Samanalakanda mist-kissed sacred peak
      }
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  const routeTubeGeo = useMemo(
    () => new THREE.TubeGeometry(routeCurve, 150, 0.09, 8, false),
    [routeCurve]
  );

  const riverTubeGeo = useMemo(
    () => new THREE.TubeGeometry(riverCurve, 120, 0.48, 8, false),
    [riverCurve]
  );

  // Build all landmark 3D models & woodland groves
  const landmarkModels = useMemo(() => {
    return {
      kotte: buildPalaceCluster(),
      dalada: buildThreeTierShrine(),
      palace: buildPalaceCluster(),
      kovil: buildKovil(),
      sapumal: buildSapumalCavalcade(),
      kitsiri: buildStupaWithBoTree(),
      kelaniya: buildStupaWithBoTree(),
      devale: buildThreeTierShrine(),
      samanala: buildMountainRange(),
      palmsA: buildPalmGrove(),
      palmsB: buildPalmGrove(),
      palmsC: buildPalmGrove()
    };
  }, []);

  // Scatter low-poly forest trees across the mainland
  const treeTransforms = useMemo(() => {
    const arr: { x: number; y: number; z: number; s: number; hue: string }[] = [];
    for (let i = 0; i < 85; i++) {
      const s1 = Math.sin(i * 73.1) * 43758.5453;
      const r1 = s1 - Math.floor(s1);
      const s2 = Math.sin(i * 191.7) * 43758.5453;
      const r2 = s2 - Math.floor(s2);
      const x = -7.5 + r1 * 26;
      const z = -12 + r2 * 22;
      if ( x < coastX(z) + 1.2) continue;
      // Keep clear of immediate landmark pads
      const nearLandmark = LANDMARKS.some(
        (lm) => Math.hypot(x - lm.x, z - lm.z) < Math.max(1.4, lm.pad * 1.25)
      );
      if (nearLandmark) continue;
      const h = sampleTerrainHeight(x, z);
      if (h > 0.3 && h < 3.2) {
        arr.push({
          x,
          y: h,
          z,
          s: 0.25 + (i % 5) * 0.06,
          hue: i % 3 === 0 ? "#2ec4b6" : i % 2 === 0 ? "#2a9d8f" : "#1f7a5c"
        });
      }
    }
    return arr;
  }, []);

  const camTarget = useRef(new THREE.Vector3(-0.5, 0.8, -1.2));
  const birdPos = useRef(new THREE.Vector3(-0.9, 2.0, 4.3));
  const trailPoints = useRef<THREE.Vector3[]>(
    Array.from({ length: 18 }, () => new THREE.Vector3(-0.9, 2.0, 4.3))
  );
  const trailGeoRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state, delta) => {
    if (!signaled.current) {
      signaled.current = true;
      markReady("map");
    }

    const t = state.clock.elapsedTime;
    const frac = verseToRouteFraction(verse);
    const pt = routeCurve.getPointAt(frac);
    const tangent = routeCurve.getTangentAt(frac);

    const snap = firstFrame.current;
    firstFrame.current = false;
    const rate = snap ? 1.0 : Math.min(1, delta * 5.0);

    // Subtle flight bob above the route curve
    const hoverOffset = Math.sin(t * 3.2) * 0.12;
    const targetBirdPos = pt.clone().add(new THREE.Vector3(0, hoverOffset, 0));

    birdPos.current.lerp(targetBirdPos, rate);
    starling.root.position.copy(birdPos.current);
    const yaw = Math.atan2(tangent.x, tangent.z);
    starling.root.rotation.set(0, yaw, 0);
    animateStarlingRig(starling, t, calmMode, 0);

    // Update glowing flight trail behind the starling
    trailPoints.current.pop();
    trailPoints.current.unshift(birdPos.current.clone());
    if (trailGeoRef.current) {
      const arr = new Float32Array(trailPoints.current.length * 3);
      trailPoints.current.forEach((p, idx) => {
        arr[idx * 3] = p.x;
        arr[idx * 3 + 1] = p.y;
        arr[idx * 3 + 2] = p.z;
      });
      trailGeoRef.current.setAttribute(
        "position",
        new THREE.BufferAttribute(arr, 3)
      );
    }

    if (waterRef.current) {
      waterRef.current.position.y = MAP.water + Math.sin(t * 1.5) * 0.02;
    }

    // Camera positioning per mode
    const desiredCamPos = new THREE.Vector3();
    const desiredLookAt = new THREE.Vector3();

    if (cameraMode === "follow") {
      desiredLookAt.copy(birdPos.current);
      desiredCamPos
        .copy(birdPos.current)
        .add(new THREE.Vector3(-tangent.x * 3.8 - 1.4, 2.2, -tangent.z * 3.8 + 2.8));
    } else if (cameraMode === "free") {
      desiredLookAt.set(dragOffset.x, 0.5, dragOffset.z);
      desiredCamPos.set(
        dragOffset.x - 1.5,
        zoomDistance * 0.65,
        dragOffset.z + zoomDistance * 0.78
      );
    } else {
      if (selectedLandmark) {
        const lh = Math.max(0.3, sampleTerrainHeight(selectedLandmark.x, selectedLandmark.z));
        desiredLookAt.set(selectedLandmark.x, lh + 0.65, selectedLandmark.z);
        desiredCamPos.set(
          selectedLandmark.x - 2.6,
          lh + 4.8,
          selectedLandmark.z + 6.4
        );
      } else {
        desiredLookAt.set(-0.5, 0.6, -1.2);
        desiredCamPos.set(-5.5, 9.8, 11.2);
      }
    }

    camTarget.current.lerp(desiredLookAt, rate);
    camera.position.lerp(desiredCamPos, rate);
    camera.lookAt(camTarget.current);

    // Project 3D pins to 2D screen coordinates
    const nextPins: Record<string, ProjectedPin> = {};
    for (const lm of LANDMARKS) {
      const groundY = Math.max(0.35, sampleTerrainHeight(lm.x, lm.z));
      const worldVec = new THREE.Vector3(lm.x, groundY + lm.pin, lm.z);
      const birdDist = worldVec.distanceTo(birdPos.current);
      const projected = worldVec.clone().project(camera);
      const sx = (projected.x * 0.5 + 0.5) * size.width;
      const sy = (-projected.y * 0.5 + 0.5) * size.height;
      nextPins[lm.id] = {
        id: lm.id,
        x: sx,
        y: sy,
        visible:
          projected.z < 1 &&
          sx > -40 &&
          sx < size.width + 40 &&
          sy > -40 &&
          sy < size.height + 40,
        birdDist
      };
    }
    for (const sc of SCENERY_LABELS) {
      const worldVec = new THREE.Vector3(sc.x, sc.y, sc.z);
      const birdDist = worldVec.distanceTo(birdPos.current);
      const projected = worldVec.clone().project(camera);
      const sx = (projected.x * 0.5 + 0.5) * size.width;
      const sy = (-projected.y * 0.5 + 0.5) * size.height;
      nextPins[sc.id] = {
        id: sc.id,
        x: sx,
        y: sy,
        visible: projected.z < 1,
        birdDist
      };
    }
    onProjectPins(nextPins);
  });

  return (
    <>
      <color attach="background" args={["#031026"]} />
      <fog attach="fog" args={["#031026", 22, 58]} />
      <ambientLight intensity={1.15} color="#90e0ef" />
      <hemisphereLight args={["#48cae4", "#031026", 0.85]} />
      <directionalLight position={[12, 26, 14]} intensity={1.85} color="#e0fbfc" />
      <directionalLight position={[-14, 12, -10]} intensity={0.75} color="#38e8ff" />

      {/* Terrain height-field mesh */}
      <mesh geometry={terrainGeo}>
        <meshStandardMaterial vertexColors flatShading roughness={0.78} metalness={0.08} />
      </mesh>

      {/* Shimmering Indian Ocean & Diyawanna moat water plane */}
      <mesh ref={waterRef} position={[0, MAP.water, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[MAP.width, MAP.depth]} />
        <meshStandardMaterial
          color="#0077b6"
          emissive="#023e8a"
          emissiveIntensity={0.35}
          roughness={0.22}
          metalness={0.35}
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* Carved Kelani River ribbon */}
      <mesh geometry={riverTubeGeo}>
        <meshStandardMaterial
          color="#00f5d4"
          emissive="#00b4d8"
          emissiveIntensity={0.4}
          roughness={0.25}
        />
      </mesh>

      {/* Luminous Flight Route Curve */}
      <mesh geometry={routeTubeGeo}>
        <meshStandardMaterial
          color="#38e8ff"
          emissive="#38e8ff"
          emissiveIntensity={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Procedural 3D Landmark Buildings on their elevated pads */}
      <group position={[0, 0.42, 5]} scale={0.52}>
        <primitive object={landmarkModels.kotte} />
      </group>
      <group position={[1.25, 0.42, 5.7]} scale={0.44}>
        <primitive object={landmarkModels.dalada} />
      </group>
      <group position={[-0.9, 0.42, 4.3]} scale={0.46}>
        <primitive object={landmarkModels.palace} />
      </group>
      <group position={[-0.8, 0.42, 1.3]} scale={0.48}>
        <primitive object={landmarkModels.kovil} />
      </group>
      <group position={[-1.5, 0.42, -1.7]} scale={0.58}>
        <primitive object={landmarkModels.sapumal} />
      </group>
      <group position={[-1.0, 0.42, -4.2]} scale={0.48}>
        <primitive object={landmarkModels.kitsiri} />
      </group>
      <group position={[-1.0, 0.42, -7.0]} scale={0.56}>
        <primitive object={landmarkModels.kelaniya} />
      </group>
      <group position={[0.9, 0.42, -6.2]} scale={0.5}>
        <primitive object={landmarkModels.devale} />
      </group>

      {/* Palm groves along coast & Kelani riverbanks */}
      <group position={[-5.2, 0.35, 2.2]} scale={0.45}>
        <primitive object={landmarkModels.palmsA} />
      </group>
      <group position={[-3.4, 0.32, -7.5]} scale={0.48}>
        <primitive object={landmarkModels.palmsB} />
      </group>
      <group position={[2.2, 0.38, -2.5]} scale={0.42}>
        <primitive object={landmarkModels.palmsC} />
      </group>

      {/* Low-poly woodland trees across Sri Lanka's lowland plains */}
      {treeTransforms.map((tr, idx) => (
        <group key={idx} position={[tr.x, tr.y, tr.z]} scale={tr.s}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.14, 0.8, 5]} />
            <meshStandardMaterial color="#4a3525" flatShading />
          </mesh>
          <mesh position={[0, 1.15, 0]}>
            <coneGeometry args={[0.68, 1.45, 6]} />
            <meshStandardMaterial color={tr.hue} flatShading roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Glowing flight trail behind the starling */}
      <line>
        <bufferGeometry ref={trailGeoRef} />
        <lineBasicMaterial color="#ffb703" linewidth={2} />
      </line>

      {/* Clearly visible, animated Starling (Salalihiniya) with point light & beacon */}
      <group scale={0.48}>
        <pointLight distance={5} intensity={2.2} color="#38e8ff" position={[0, 0.6, 0]} />
        <primitive object={starling.root} />
      </group>
    </>
  );
}

export function MapExperience() {
  const { calmMode } = useCalm();
  const [verse, setVerse] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>("kotte");
  const [cameraMode, setCameraMode] = useState<CameraMode>("overview");
  const [pins, setPins] = useState<Record<string, ProjectedPin>>({});
  const [dragOffset, setDragOffset] = useState({ x: -0.5, z: -1.2 });
  const [zoomDistance, setZoomDistance] = useState(12.5);
  const dragStart = useRef<{ x: number; y: number; ox: number; oz: number } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => markReady("map"), 600);
    return () => window.clearTimeout(t);
  }, []);

  const selectedLandmark = useMemo(
    () => LANDMARKS.find((l) => l.id === selectedId) ?? null,
    [selectedId]
  );

  const selectLandmark = (lm: Landmark) => {
    setSelectedId(lm.id);
    setVerse(lm.from);
    if (cameraMode === "free") setCameraMode("overview");
  };

  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none"
      onMouseDown={(e) => {
        if (cameraMode !== "free") return;
        dragStart.current = {
          x: e.clientX,
          y: e.clientY,
          ox: dragOffset.x,
          oz: dragOffset.z
        };
      }}
      onMouseMove={(e) => {
        if (!dragStart.current || cameraMode !== "free") return;
        const dx = (e.clientX - dragStart.current.x) * -0.04;
        const dz = (e.clientY - dragStart.current.y) * -0.04;
        setDragOffset({
          x: Math.max(-20, Math.min(26, dragStart.current.ox + dx)),
          z: Math.max(-16, Math.min(16, dragStart.current.oz + dz))
        });
      }}
      onMouseUp={() => {
        dragStart.current = null;
      }}
      onWheel={(e) => {
        if (cameraMode === "free") {
          setZoomDistance((z) => Math.max(5, Math.min(26, z + e.deltaY * 0.01)));
        }
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [-5.5, 9.8, 11.2], fov: 42 }}
        gl={{ antialias: true }}
      >
        <MapWorld
          verse={verse}
          selectedLandmark={selectedLandmark}
          cameraMode={cameraMode}
          calmMode={calmMode}
          dragOffset={dragOffset}
          zoomDistance={zoomDistance}
          onProjectPins={setPins}
        />
      </Canvas>

      {/* Floating 3D Landmark Pins & Labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {LANDMARKS.map((lm) => {
          const p = pins[lm.id];
          if (!p || !p.visible) return null;
          const isSelected = selectedId === lm.id;
          // Fade out label when the bird is close so the bird is never covered by text
          const nearBirdFade = p.birdDist < 2.1 ? 0.12 : p.birdDist < 3.4 ? 0.48 : 1.0;

          return (
            <button
              key={lm.id}
              type="button"
              onClick={() => selectLandmark(lm)}
              style={{
                transform: `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -100%)`,
                opacity: nearBirdFade
              }}
              className={`pointer-events-auto absolute left-0 top-0 flex flex-col items-center transition-opacity duration-300 ${
                isSelected ? "z-20" : "z-10"
              }`}
            >
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] backdrop-blur-md transition-all ${
                  isSelected
                    ? "bg-gold text-[#031026] border-gold font-semibold shadow-lg scale-105"
                    : "bg-[#03091e]/85 text-ink-soft border-line hover:text-ink"
                }`}
              >
                {isSelected ? `${lm.si} · ${lm.en}` : lm.en}
              </span>
              <span className="h-3 w-px bg-gold/70" />
              <span className="h-2 w-2 rounded-full bg-gold shadow" />
            </button>
          );
        })}

        {SCENERY_LABELS.map((sc) => {
          const p = pins[sc.id];
          if (!p || !p.visible) return null;
          return (
            <div
              key={sc.id}
              style={{
                transform: `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -50%)`
              }}
              className="absolute left-0 top-0 text-[10px] uppercase tracking-widest text-ink-faint/80"
            >
              {sc.en}
            </div>
          );
        })}
      </div>

      {/* Overlay Controls & Bottom Sheet */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 top-16 z-30 flex flex-col justify-between px-3 sm:px-6">
        <div className="flex justify-end">
          <div
            role="group"
            aria-label="Camera mode"
            className="glass pointer-events-auto inline-flex rounded-full p-1 text-xs"
          >
            {(
              [
                { id: "overview", label: "Overview" },
                { id: "follow", label: "Follow Bird" },
                { id: "free", label: "Free Pan" }
              ] as { id: CameraMode; label: string }[]
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setCameraMode(m.id)}
                aria-pressed={cameraMode === m.id}
                className={`rounded-full px-3 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                  cameraMode === m.id
                    ? "bg-gold text-[#031026] font-medium"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end max-w-6xl w-full mx-auto">
          <div className="glass pointer-events-auto lg:col-span-7 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-gold font-medium">
                Route Landmarks · කෝට්ටේ සිට කැලණියට
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setCameraMode("overview");
                }}
                className="text-xs text-ink-soft hover:text-gold"
              >
                Full route view
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto thin-scroll pr-1">
              {LANDMARKS.map((lm) => {
                const active = selectedId === lm.id;
                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => selectLandmark(lm)}
                    className={`rounded-full px-2.5 py-1 text-xs border transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                      active
                        ? "bg-gold text-[#031026] border-gold font-medium"
                        : "bg-white/5 text-ink-soft border-line hover:text-ink"
                    }`}
                  >
                    {lm.en}
                  </button>
                );
              })}
            </div>

            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="map-verse-scrubber" className="text-ink-soft">
                  Fly the starling along the route:
                </label>
                <span className="font-mono text-gold">Verse {verse} / 111</span>
              </div>
              <input
                id="map-verse-scrubber"
                type="range"
                min={1}
                max={111}
                value={verse}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVerse(v);
                  const matchingLm = LANDMARKS.find((l) => v >= l.from && v <= l.to);
                  if (matchingLm) setSelectedId(matchingLm.id);
                }}
                className="w-full accent-[#38e8ff] cursor-pointer"
              />
            </div>
          </div>

          {selectedLandmark && (
            <div className="glass pointer-events-auto lg:col-span-5 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 lang="si" className="font-elu text-base sm:text-lg text-ink">
                    {selectedLandmark.si}
                  </h2>
                  <p className="font-display italic text-sm text-gold">
                    {selectedLandmark.en}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 border border-line px-2.5 py-0.5 text-xs text-ink-soft">
                  {selectedLandmark.from === selectedLandmark.to
                    ? `Verse ${selectedLandmark.from}`
                    : `Verses ${selectedLandmark.from}–${selectedLandmark.to}`}
                </span>
              </div>
              <p lang="si" className="font-sinhala text-xs text-ink-soft leading-relaxed">
                {selectedLandmark.blurbSi}
              </p>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {selectedLandmark.blurbEn}
              </p>
              <div className="pt-1">
                <Link
                  href={selectedLandmark.from === 1 ? "/" : `/verse/${selectedLandmark.from}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-medium text-[#031026] hover:bg-gold/90 transition-colors"
                >
                  Read these verses →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
