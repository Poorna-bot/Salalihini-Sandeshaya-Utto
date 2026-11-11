import * as THREE from "three";

export const shared = {
  fogColor: { value: new THREE.Color("#03091c") },
  rimColor: { value: new THREE.Color("#38e8ff") },
  night: { value: 0.0 },
  time: { value: 0.0 }
};

export interface KitMaterialOptions {
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  sway?: number;
  windowGlow?: boolean;
}

export function makeMat(opts: KitMaterialOptions): THREE.MeshStandardMaterial {
  const params: THREE.MeshStandardMaterialParameters = {
    color: opts.color,
    roughness: opts.roughness ?? 0.72,
    metalness: opts.metalness ?? 0.12,
    flatShading: true
  };

  if (opts.emissive !== undefined) {
    params.emissive = new THREE.Color(opts.emissive);
    params.emissiveIntensity = opts.emissiveIntensity ?? 1.0;
  } else if (opts.windowGlow) {
    params.emissive = new THREE.Color("#38e8ff");
    params.emissiveIntensity = 0.85;
  }

  return new THREE.MeshStandardMaterial(params);
}
