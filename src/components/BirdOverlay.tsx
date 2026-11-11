"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createStarlingRig, animateStarlingRig } from "@/lib/myna";
import { useJourney } from "@/lib/useJourney";
import { useCalm } from "./CalmContext";
import { markReady } from "@/lib/loading";

function StarlingActor({
  progress,
  verseNumber,
  calmMode
}: {
  progress: number;
  verseNumber: number | null;
  calmMode: boolean;
}) {
  const rig = useMemo(() => createStarlingRig(false), []);
  const { viewport } = useThree();
  const signaled = useRef(false);
  const firstFrame = useRef(true);
  const prevVerse = useRef<number | null>(verseNumber);
  const swoopRef = useRef(0);
  const posRef = useRef(new THREE.Vector3(0, 0.7, 0));
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const smoothPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prevVerse.current !== verseNumber) {
      prevVerse.current = verseNumber;
      swoopRef.current = calmMode ? 0.25 : 1.0;
    }
  }, [verseNumber, calmMode]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      pointerRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
        active: true
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!signaled.current) {
      signaled.current = true;
      markReady("bird");
    }

    const t = state.clock.elapsedTime;
    swoopRef.current = Math.max(0, swoopRef.current - delta * 1.4);

    // Smoothly interpolate mouse pointer offset
    const ptrEase = Math.min(1, delta * 6.0);
    const targetPtrX = !calmMode && pointerRef.current.active ? pointerRef.current.x : 0;
    const targetPtrY = !calmMode && pointerRef.current.active ? pointerRef.current.y : 0;
    smoothPointer.current.x += (targetPtrX - smoothPointer.current.x) * ptrEase;
    smoothPointer.current.y += (targetPtrY - smoothPointer.current.y) * ptrEase;

    // Clamp flight path strictly inside the visible viewport at every screen width
    const safeHalfW = Math.max(0.6, viewport.width * 0.36);
    const safeHalfH = Math.max(0.5, viewport.height * 0.32);

    const baseX = (progress - 0.5) * safeHalfW * 0.85;
    const wanderX =
      Math.sin(t * (calmMode ? 0.25 : 0.55)) * safeHalfW * (calmMode ? 0.1 : 0.22);
    const mouseOffsetX = smoothPointer.current.x * safeHalfW * 0.62;
    const targetX = THREE.MathUtils.clamp(
      baseX + wanderX + mouseOffsetX,
      -safeHalfW,
      safeHalfW
    );

    const baseY = safeHalfH * 0.32;
    const wanderY =
      Math.cos(t * (calmMode ? 0.3 : 0.7)) * safeHalfH * (calmMode ? 0.08 : 0.18) -
      Math.sin(swoopRef.current * Math.PI) * 0.32;
    const mouseOffsetY = smoothPointer.current.y * safeHalfH * 0.58;
    const targetY = THREE.MathUtils.clamp(
      baseY + wanderY + mouseOffsetY,
      -safeHalfH * 0.55,
      safeHalfH * 0.88
    );

    if (firstFrame.current) {
      firstFrame.current = false;
      posRef.current.set(targetX, targetY, 0);
    } else {
      const ease = Math.min(1, delta * 4.8);
      posRef.current.x += (targetX - posRef.current.x) * ease;
      posRef.current.y += (targetY - posRef.current.y) * ease;
    }

    rig.root.position.copy(posRef.current);
    const vx = targetX - posRef.current.x;
    const vy = targetY - posRef.current.y;

    // Bank and turn the starling naturally toward the cursor movement
    rig.root.rotation.y =
      0.62 +
      smoothPointer.current.x * 0.38 +
      THREE.MathUtils.clamp(vx * 0.75, -0.42, 0.42);
    rig.root.rotation.z = THREE.MathUtils.clamp(
      -vx * 0.55 - smoothPointer.current.x * 0.22,
      -0.38,
      0.38
    );
    rig.root.rotation.x = THREE.MathUtils.clamp(
      -vy * 0.35 - smoothPointer.current.y * 0.18,
      -0.28,
      0.28
    );

    animateStarlingRig(rig, t, calmMode, swoopRef.current);
    rig.headGroup.rotation.y = smoothPointer.current.x * 0.35;
  });

  return (
    <group scale={0.46}>
      <primitive object={rig.root} />
    </group>
  );
}

export default function BirdOverlay() {
  const { progress, verseNumber } = useJourney();
  const { calmMode } = useCalm();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-[5] pointer-events-none"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 5, 4]} intensity={1.65} color="#64dfdf" />
        <StarlingActor
          progress={progress}
          verseNumber={verseNumber}
          calmMode={calmMode}
        />
      </Canvas>
    </div>
  );
}
