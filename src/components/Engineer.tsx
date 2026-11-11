"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCalm } from "./CalmContext";

export function Engineer() {
  const { calmMode } = useCalm();
  const svgRef = useRef<SVGSVGElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);
  const leftEyeGroupRef = useRef<SVGGElement>(null);
  const rightEyeGroupRef = useRef<SVGGElement>(null);
  const browsGroupRef = useRef<SVGGElement>(null);

  const [blinking, setBlinking] = useState(false);
  const targetLook = useRef({ x: 0, y: 0 });
  const currentLook = useRef({ x: 0, y: 0 });
  const hasPointer = useRef(false);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      if (calmMode) return;
      hasPointer.current = true;
      const el = svgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.42;

      const rawDx = e.clientX - cx;
      const rawDy = e.clientY - cy;
      const angle = Math.atan2(rawDy, rawDx);
      const dist = Math.min(1, Math.hypot(rawDx, rawDy) / 220);

      targetLook.current = {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    let raf = 0;
    const tick = (t: number) => {
      if (calmMode) {
        targetLook.current = { x: 0, y: 0 };
      } else if (!hasPointer.current) {
        targetLook.current = {
          x: Math.sin(t * 0.0014) * 0.65,
          y: Math.cos(t * 0.001) * 0.4
        };
      }

      // Smooth 60fps spring-like interpolation
      currentLook.current.x += (targetLook.current.x - currentLook.current.x) * 0.18;
      currentLook.current.y += (targetLook.current.y - currentLook.current.y) * 0.18;

      const lx = currentLook.current.x;
      const ly = currentLook.current.y;

      // Move pupils generously inside the round glasses (up to 6.2px horizontally, 5.4px vertically)
      const pupilX = lx * 6.2;
      const pupilY = ly * 5.4;
      const headX = lx * 5.0;
      const headY = ly * 3.2;
      const headTilt = lx * 6.5;
      const browY = ly * -2.2;

      if (headGroupRef.current) {
        headGroupRef.current.setAttribute(
          "transform",
          `translate(${headX.toFixed(2)}, ${headY.toFixed(2)}) rotate(${headTilt.toFixed(2)} 110 95)`
        );
      }
      if (leftEyeGroupRef.current) {
        leftEyeGroupRef.current.setAttribute(
          "transform",
          `translate(${pupilX.toFixed(2)}, ${pupilY.toFixed(2)})`
        );
      }
      if (rightEyeGroupRef.current) {
        rightEyeGroupRef.current.setAttribute(
          "transform",
          `translate(${pupilX.toFixed(2)}, ${pupilY.toFixed(2)})`
        );
      }
      if (browsGroupRef.current) {
        browsGroupRef.current.setAttribute(
          "transform",
          `translate(${(lx * 1.5).toFixed(2)}, ${browY.toFixed(2)})`
        );
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.cancelAnimationFrame(raf);
    };
  }, [calmMode]);

  // Occasional natural blink
  useEffect(() => {
    if (calmMode) return;
    const interval = window.setInterval(() => {
      setBlinking(true);
      window.setTimeout(() => setBlinking(false), 140);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [calmMode]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg
        ref={svgRef}
        viewBox="0 0 220 220"
        className={`w-48 h-48 sm:w-56 sm:h-56 ${calmMode ? "" : "engineer-bob"}`}
        role="img"
        aria-label="Illustrated student wearing round glasses whose eyes follow the cursor"
      >
        <defs>
          <radialGradient id="engGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#38e8ff" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#38e8ff" stopOpacity="0" />
          </radialGradient>
          <clipPath id="leftLensClip">
            <circle cx="93" cy="93" r="12.5" />
          </clipPath>
          <clipPath id="rightLensClip">
            <circle cx="127" cy="93" r="12.5" />
          </clipPath>
        </defs>

        <circle cx="110" cy="110" r="92" fill="url(#engGlow)" />

        {/* Upper-body shoulders & collar */}
        <path
          d="M52 196 C56 154, 82 142, 110 142 C138 142, 164 154, 168 196 Z"
          fill="#0b1d3a"
          stroke="#38e8ff"
          strokeOpacity="0.45"
          strokeWidth="1.6"
        />
        <path
          d="M92 142 L110 164 L128 142"
          fill="none"
          stroke="#38e8ff"
          strokeOpacity="0.65"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <rect x="98" y="122" width="24" height="24" rx="8" fill="#c98c68" />

        {/* Head group tilting and shifting smoothly toward cursor */}
        <g ref={headGroupRef} transform="translate(0, 0) rotate(0 110 95)">
          {/* Ears */}
          <circle cx="72" cy="96" r="8" fill="#c98c68" />
          <circle cx="148" cy="96" r="8" fill="#c98c68" />

          {/* Face oval */}
          <rect x="74" y="54" width="72" height="76" rx="34" fill="#d89b74" />

          {/* Wavy dark hair */}
          <path
            d="M71 84 C70 50, 92 40, 112 42 C134 40, 152 54, 149 84 C143 68, 128 60, 110 61 C92 60, 78 68, 71 84 Z"
            fill="#111827"
          />

          {/* Expressive Eyebrows */}
          <g ref={browsGroupRef}>
            <path
              d="M82 77 Q93 72 103 77"
              fill="none"
              stroke="#111827"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M117 77 Q127 72 138 77"
              fill="none"
              stroke="#111827"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </g>

          {/* Eye whites (sclera) inside glasses */}
          <circle cx="93" cy="93" r="10.5" fill="#f8fafc" />
          <circle cx="127" cy="93" r="10.5" fill="#f8fafc" />

          {/* Moving Iris + Pupil + Glint clipped cleanly inside each lens */}
          {blinking ? (
            <>
              <line x1="84" y1="93" x2="102" y2="93" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="118" y1="93" x2="136" y2="93" stroke="#111827" strokeWidth="2.8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <g clipPath="url(#leftLensClip)">
                <g ref={leftEyeGroupRef}>
                  <circle cx="93" cy="93" r="5.6" fill="#0e7490" />
                  <circle cx="93" cy="93" r="3.4" fill="#0f172a" />
                  <circle cx="91.2" cy="91.0" r="1.7" fill="#ffffff" />
                  <circle cx="94.8" cy="94.6" r="0.8" fill="#67e8f9" />
                </g>
              </g>
              <g clipPath="url(#rightLensClip)">
                <g ref={rightEyeGroupRef}>
                  <circle cx="127" cy="93" r="5.6" fill="#0e7490" />
                  <circle cx="127" cy="93" r="3.4" fill="#0f172a" />
                  <circle cx="125.2" cy="91.0" r="1.7" fill="#ffffff" />
                  <circle cx="128.8" cy="94.6" r="0.8" fill="#67e8f9" />
                </g>
              </g>
            </>
          )}

          {/* Round glasses frames on top */}
          <circle
            cx="93"
            cy="93"
            r="13.5"
            fill="#031026"
            fillOpacity="0.08"
            stroke="#38e8ff"
            strokeWidth="2.6"
          />
          <circle
            cx="127"
            cy="93"
            r="13.5"
            fill="#031026"
            fillOpacity="0.08"
            stroke="#38e8ff"
            strokeWidth="2.6"
          />
          <path
            d="M106.5 93 Q110 90 113.5 93"
            fill="none"
            stroke="#38e8ff"
            strokeWidth="2.4"
          />

          {/* Nose & warm smile */}
          <path
            d="M110 96 L108 106 L112 107"
            fill="none"
            stroke="#a86d4c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M100 115 Q110 122 120 115"
            fill="none"
            stroke="#5a2e1b"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
