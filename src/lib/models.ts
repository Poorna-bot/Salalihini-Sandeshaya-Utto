import * as THREE from "three";
import { makeMat } from "./kit";

function addMesh(
  parent: THREE.Group,
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  pos: [number, number, number],
  rot?: [number, number, number],
  scale?: [number, number, number]
): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(pos[0], pos[1], pos[2]);
  if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
  if (scale) m.scale.set(scale[0], scale[1], scale[2]);
  parent.add(m);
  return m;
}

export function buildPalaceCluster(): THREE.Group {
  const g = new THREE.Group();
  const wallMat = makeMat({ color: "#e8dcc8", roughness: 0.75 });
  const roofMat = makeMat({ color: "#8c2d2d", roughness: 0.65 });
  const goldMat = makeMat({
    color: "#38e8ff",
    metalness: 0.55,
    roughness: 0.3,
    emissive: "#ffae34",
    emissiveIntensity: 0.35
  });
  const winMat = makeMat({
    color: "#ffcf70",
    emissive: "#ffb84d",
    emissiveIntensity: 0.6,
    windowGlow: true
  });

  // Central palace tiers
  addMesh(g, new THREE.BoxGeometry(2.6, 0.9, 1.8), wallMat, [0, 0.45, 0]);
  addMesh(g, new THREE.ConeGeometry(2.1, 0.65, 4), roofMat, [0, 1.2, 0], [0, Math.PI / 4, 0]);
  addMesh(g, new THREE.BoxGeometry(1.7, 0.7, 1.2), wallMat, [0, 1.65, 0]);
  addMesh(g, new THREE.ConeGeometry(1.45, 0.55, 4), roofMat, [0, 2.25, 0], [0, Math.PI / 4, 0]);
  addMesh(g, new THREE.ConeGeometry(0.12, 0.55, 6), goldMat, [0, 2.75, 0]);

  // Glowing windows
  for (const x of [-0.7, 0, 0.7]) {
    addMesh(g, new THREE.BoxGeometry(0.22, 0.3, 0.06), winMat, [x, 0.5, 0.91]);
  }
  for (const x of [-0.45, 0.45]) {
    addMesh(g, new THREE.BoxGeometry(0.18, 0.25, 0.06), winMat, [x, 1.65, 0.61]);
  }

  // Flanking mansions
  for (const side of [-1, 1]) {
    addMesh(g, new THREE.BoxGeometry(1.2, 0.65, 1.1), wallMat, [side * 2.2, 0.32, 0.2]);
    addMesh(g, new THREE.ConeGeometry(1.0, 0.45, 4), roofMat, [side * 2.2, 0.85, 0.2], [0, Math.PI / 4, 0]);
    addMesh(g, new THREE.ConeGeometry(0.08, 0.35, 5), goldMat, [side * 2.2, 1.2, 0.2]);
    addMesh(g, new THREE.BoxGeometry(0.18, 0.24, 0.05), winMat, [side * 2.2, 0.35, 0.76]);
  }

  return g;
}

export function buildThreeTierShrine(): THREE.Group {
  const g = new THREE.Group();
  const baseMat = makeMat({ color: "#f3ead8", roughness: 0.7 });
  const roofMat = makeMat({ color: "#b5482a", roughness: 0.6 });
  const goldMat = makeMat({
    color: "#ffd57a",
    metalness: 0.6,
    roughness: 0.28,
    emissive: "#ffb740",
    emissiveIntensity: 0.45
  });

  const tiers = [
    { w: 2.0, h: 0.65, y: 0.32, r: 1.65 },
    { w: 1.45, h: 0.55, y: 1.05, r: 1.22 },
    { w: 0.95, h: 0.48, y: 1.68, r: 0.85 }
  ];
  for (const t of tiers) {
    addMesh(g, new THREE.BoxGeometry(t.w, t.h, t.w * 0.82), baseMat, [0, t.y, 0]);
    addMesh(g, new THREE.ConeGeometry(t.r, 0.42, 4), roofMat, [0, t.y + t.h * 0.5 + 0.18, 0], [0, Math.PI / 4, 0]);
  }
  addMesh(g, new THREE.ConeGeometry(0.11, 0.55, 6), goldMat, [0, 2.38, 0]);
  return g;
}

export function buildStupaWithBoTree(): THREE.Group {
  const g = new THREE.Group();
  const whiteMat = makeMat({ color: "#f8f4ec", roughness: 0.65 });
  const goldMat = makeMat({
    color: "#ffd670",
    metalness: 0.55,
    roughness: 0.3,
    emissive: "#ffae34",
    emissiveIntensity: 0.4
  });
  const trunkMat = makeMat({ color: "#5c4028", roughness: 0.9 });
  const leafMat = makeMat({ color: "#2d6a4f", roughness: 0.78, sway: 0.06 });

  // Stupa terrace, dome (bell), harmika, spire
  addMesh(g, new THREE.CylinderGeometry(1.45, 1.6, 0.28, 12), whiteMat, [0, 0.14, 0]);
  addMesh(g, new THREE.SphereGeometry(1.1, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), whiteMat, [0, 0.26, 0]);
  addMesh(g, new THREE.BoxGeometry(0.48, 0.28, 0.48), whiteMat, [0, 1.42, 0]);
  addMesh(g, new THREE.ConeGeometry(0.22, 0.95, 10), goldMat, [0, 2.02, 0]);

  // Sacred Bo tree beside stupa
  addMesh(g, new THREE.CylinderGeometry(0.14, 0.22, 0.95, 7), trunkMat, [1.85, 0.48, 0.3]);
  addMesh(g, new THREE.DodecahedronGeometry(0.68, 0), leafMat, [1.85, 1.15, 0.3]);
  addMesh(g, new THREE.DodecahedronGeometry(0.48, 0), leafMat, [1.45, 0.98, 0.5]);
  addMesh(g, new THREE.DodecahedronGeometry(0.45, 0), leafMat, [2.2, 1.0, 0.15]);

  return g;
}

export function buildKovil(): THREE.Group {
  const g = new THREE.Group();
  const stoneMat = makeMat({ color: "#d69f6a", roughness: 0.75 });
  const tierMatA = makeMat({ color: "#c85a48", roughness: 0.7 });
  const tierMatB = makeMat({ color: "#4a6fa5", roughness: 0.7 });
  const goldMat = makeMat({
    color: "#38e8ff",
    metalness: 0.6,
    roughness: 0.3,
    emissive: "#ffb703",
    emissiveIntensity: 0.5
  });

  // Sanctum + stepped Gopuram tower
  addMesh(g, new THREE.BoxGeometry(1.6, 0.65, 1.4), stoneMat, [0, 0.32, 0]);
  for (let i = 0; i < 4; i++) {
    const w = 1.25 - i * 0.22;
    const d = 0.85 - i * 0.14;
    const y = 0.82 + i * 0.38;
    addMesh(g, new THREE.BoxGeometry(w, 0.34, d), i % 2 === 0 ? tierMatA : tierMatB, [0, y, 0]);
  }
  for (const x of [-0.22, 0, 0.22]) {
    addMesh(g, new THREE.ConeGeometry(0.06, 0.24, 6), goldMat, [x, 2.28, 0]);
  }
  // Glowing oil lamps at entrance
  for (const x of [-0.65, 0.65]) {
    addMesh(g, new THREE.CylinderGeometry(0.05, 0.08, 0.32, 6), stoneMat, [x, 0.16, 0.9]);
    addMesh(g, new THREE.SphereGeometry(0.07, 6, 6), goldMat, [x, 0.36, 0.9]);
  }
  return g;
}

export function buildPalmGrove(): THREE.Group {
  const g = new THREE.Group();
  const trunkMat = makeMat({ color: "#5e432d", roughness: 0.88, sway: 0.03 });
  const frondMat = makeMat({ color: "#2a6f4e", roughness: 0.75, sway: 0.09 });

  const positions: [number, number, number, number][] = [
    [-2.4, 0, -0.4, 1.15],
    [-1.1, 0, 0.35, 0.95],
    [0.6, 0, -0.25, 1.25],
    [2.1, 0, 0.2, 1.05],
    [3.1, 0, -0.5, 0.88]
  ];

  for (const [x, y, z, s] of positions) {
    const palm = new THREE.Group();
    palm.position.set(x, y, z);
    palm.scale.setScalar(s);
    const trunk = addMesh(palm, new THREE.CylinderGeometry(0.06, 0.12, 1.65, 6), trunkMat, [0, 0.82, 0]);
    trunk.rotation.z = (x > 0 ? -1 : 1) * 0.08;
    for (let a = 0; a < 5; a++) {
      const angle = (a / 5) * Math.PI * 2;
      const frond = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.85, 4), frondMat);
      frond.position.set(Math.cos(angle) * 0.32, 1.62, Math.sin(angle) * 0.32);
      frond.rotation.z = -Math.cos(angle) * 1.05;
      frond.rotation.x = Math.sin(angle) * 1.05;
      palm.add(frond);
    }
    g.add(palm);
  }
  return g;
}

export function buildMountainRange(): THREE.Group {
  const g = new THREE.Group();
  const rockMat = makeMat({ color: "#2b3a55", roughness: 0.88 });
  const peakMat = makeMat({ color: "#3d5278", roughness: 0.82 });
  const goldMat = makeMat({
    color: "#38e8ff",
    emissive: "#ffae34",
    emissiveIntensity: 0.5
  });

  // Samanalakanda (Adam's Peak) conical silhouette + flanking peaks
  addMesh(g, new THREE.ConeGeometry(1.9, 3.2, 6), peakMat, [0.4, 1.6, -0.6]);
  addMesh(g, new THREE.SphereGeometry(0.09, 6, 6), goldMat, [0.4, 3.25, -0.6]);
  addMesh(g, new THREE.ConeGeometry(1.5, 2.1, 5), rockMat, [-1.6, 1.05, -0.2]);
  addMesh(g, new THREE.ConeGeometry(1.4, 1.85, 5), rockMat, [2.2, 0.92, -0.3]);
  return g;
}

export function buildSapumalCavalcade(): THREE.Group {
  const g = new THREE.Group();
  const steedMat = makeMat({ color: "#1d3557", roughness: 0.7 });
  const goldMat = makeMat({
    color: "#38e8ff",
    metalness: 0.5,
    roughness: 0.3,
    emissive: "#ffb703",
    emissiveIntensity: 0.35
  });
  const bannerMat = makeMat({ color: "#e63946", roughness: 0.65, sway: 0.08 });

  // Blue steed & rider + royal parasol & banners
  addMesh(g, new THREE.BoxGeometry(0.55, 0.32, 0.24), steedMat, [0, 0.35, 0]);
  addMesh(g, new THREE.ConeGeometry(0.16, 0.42, 5), goldMat, [0, 0.68, 0]);
  for (const [bx, bz] of [[-0.5, -0.25], [0.5, -0.25], [0, -0.45]]) {
    addMesh(g, new THREE.CylinderGeometry(0.02, 0.02, 1.15, 5), goldMat, [bx, 0.58, bz]);
    addMesh(g, new THREE.ConeGeometry(0.28, 0.14, 8), bannerMat, [bx, 1.18, bz]);
  }
  return g;
}
