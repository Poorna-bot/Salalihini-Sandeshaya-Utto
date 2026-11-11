"use client";

import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { markReady } from "@/lib/loading";

const SceneRoot = dynamic(() => import("./SceneRoot"), { ssr: false });
const BirdOverlay = dynamic(() => import("./BirdOverlay"), { ssr: false });

class WebGLErrorBoundary extends Component<
  { onFail: () => void; children: React.ReactNode },
  { failed: boolean }
> {
  constructor(props: { onFail: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function SceneLoader() {
  const pathname = usePathname() || "/";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        markReady("scene");
        markReady("bird");
        markReady("map");
      }
    } catch {
      markReady("scene");
      markReady("bird");
      markReady("map");
    }
  }, []);

  // Never run two WebGL contexts at once; /map owns its own canvas
  if (!mounted || pathname === "/map") {
    return null;
  }

  return (
    <>
      <WebGLErrorBoundary onFail={() => markReady("scene")}>
        <SceneRoot />
      </WebGLErrorBoundary>
      <WebGLErrorBoundary onFail={() => markReady("bird")}>
        <BirdOverlay />
      </WebGLErrorBoundary>
    </>
  );
}
