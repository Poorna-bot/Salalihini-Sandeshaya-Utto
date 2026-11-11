import * as THREE from "three";

export interface StarlingRig {
  root: THREE.Group;
  bodyGroup: THREE.Group;
  headGroup: THREE.Group;
  tailGroup: THREE.Group;
  leftWingInner: THREE.Group;
  leftWingOuter: THREE.Group;
  rightWingInner: THREE.Group;
  rightWingOuter: THREE.Group;
  haloMesh?: THREE.Mesh;
}

export function createStarlingRig(withMapBeacon = false): StarlingRig {
  const root = new THREE.Group();
  const bodyGroup = new THREE.Group();
  root.add(bodyGroup);

  // Glossy iridescent starling / hill-myna plumage with luminous cyan-indigo sheen
  const plumageMat = new THREE.MeshStandardMaterial({
    color: "#1e2952",
    emissive: "#0d3b66",
    emissiveIntensity: 0.45,
    roughness: 0.32,
    metalness: 0.45,
    flatShading: true
  });

  const sheenMat = new THREE.MeshStandardMaterial({
    color: "#2ec4b6",
    emissive: "#38e8ff",
    emissiveIntensity: 0.38,
    roughness: 0.28,
    metalness: 0.5,
    flatShading: true
  });

  // White wing-patch feathers characteristic of the Sri Lankan Salalihiniya (Hill Myna)
  const whitePatchMat = new THREE.MeshStandardMaterial({
    color: "#f8fafc",
    emissive: "#90e0ef",
    emissiveIntensity: 0.5,
    roughness: 0.3,
    flatShading: true
  });

  // Bright golden-orange beak & ear-wattles
  const beakMat = new THREE.MeshStandardMaterial({
    color: "#ffb703",
    emissive: "#fb8500",
    emissiveIntensity: 0.65,
    roughness: 0.25,
    metalness: 0.2,
    flatShading: true
  });

  const wattleMat = new THREE.MeshStandardMaterial({
    color: "#ffd166",
    emissive: "#ffb703",
    emissiveIntensity: 0.55,
    roughness: 0.3,
    flatShading: true
  });

  // Sleek faceted torso (oriented along +Z forward)
  const torsoGeo = new THREE.OctahedronGeometry(0.38, 1);
  torsoGeo.scale(0.72, 0.62, 1.42);
  const torso = new THREE.Mesh(torsoGeo, plumageMat);
  bodyGroup.add(torso);

  // Iridescent cyan-green mantle/breast
  const breastGeo = new THREE.OctahedronGeometry(0.3, 1);
  breastGeo.scale(0.66, 0.55, 1.08);
  const breast = new THREE.Mesh(breastGeo, sheenMat);
  breast.position.set(0, 0.05, 0.14);
  bodyGroup.add(breast);

  // Head + golden hill-myna wattles + pointed orange-gold beak
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.16, 0.48);
  bodyGroup.add(headGroup);

  const headGeo = new THREE.OctahedronGeometry(0.21, 1);
  headGeo.scale(0.85, 0.88, 1.08);
  const headMesh = new THREE.Mesh(headGeo, plumageMat);
  headGroup.add(headMesh);

  // Golden-yellow nape lappets/wattles
  for (const side of [-1, 1]) {
    const wattle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.12), wattleMat);
    wattle.position.set(side * 0.15, 0.03, -0.04);
    headGroup.add(wattle);
  }

  const beakGeo = new THREE.ConeGeometry(0.068, 0.3, 4);
  beakGeo.rotateX(Math.PI / 2);
  const beak = new THREE.Mesh(beakGeo, beakMat);
  beak.position.set(0, -0.01, 0.26);
  headGroup.add(beak);

  // Tail fan
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, 0.02, -0.48);
  bodyGroup.add(tailGroup);

  for (const angle of [-0.2, 0, 0.2]) {
    const featherGeo = new THREE.BoxGeometry(0.13, 0.026, 0.4);
    const feather = new THREE.Mesh(featherGeo, angle === 0 ? sheenMat : plumageMat);
    feather.position.set(Math.sin(angle) * 0.07, 0, -0.18);
    feather.rotation.y = angle;
    tailGroup.add(feather);
  }

  // Articulated two-segment wings with white primary flash
  function buildWing(side: -1 | 1): { inner: THREE.Group; outer: THREE.Group } {
    const inner = new THREE.Group();
    inner.position.set(side * 0.22, 0.07, 0.08);
    bodyGroup.add(inner);

    const innerPlateGeo = new THREE.BoxGeometry(0.46, 0.03, 0.36);
    const innerPlate = new THREE.Mesh(innerPlateGeo, sheenMat);
    innerPlate.position.set(side * 0.23, 0, -0.02);
    innerPlate.rotation.y = side * -0.12;
    inner.add(innerPlate);

    const outer = new THREE.Group();
    outer.position.set(side * 0.44, 0, 0);
    inner.add(outer);

    for (let i = 0; i < 3; i++) {
      const len = 0.48 - i * 0.07;
      const fGeo = new THREE.BoxGeometry(len, 0.024, 0.12);
      const fMesh = new THREE.Mesh(
        fGeo,
        i === 1 ? whitePatchMat : i === 0 ? sheenMat : plumageMat
      );
      fMesh.position.set(side * (len * 0.48), 0, -i * 0.09);
      fMesh.rotation.y = side * (-0.18 - i * 0.11);
      outer.add(fMesh);
    }

    return { inner, outer };
  }

  const left = buildWing(-1);
  const right = buildWing(1);

  let haloMesh: THREE.Mesh | undefined;
  if (withMapBeacon) {
    // Glowing ring + soft golden-cyan beacon around the bird on the 3D map so it is always easy to spot
    const ringGeo = new THREE.RingGeometry(0.65, 0.85, 24);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: "#38e8ff",
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    haloMesh = new THREE.Mesh(ringGeo, ringMat);
    haloMesh.position.set(0, -0.18, 0);
    root.add(haloMesh);
  }

  return {
    root,
    bodyGroup,
    headGroup,
    tailGroup,
    leftWingInner: left.inner,
    leftWingOuter: left.outer,
    rightWingInner: right.inner,
    rightWingOuter: right.outer,
    haloMesh
  };
}

export function animateStarlingRig(
  rig: StarlingRig,
  time: number,
  calm: boolean,
  swoopAmount = 0
) {
  const speed = calm ? 3.2 : 7.0;
  const amp = calm ? 0.3 : 0.65;
  const phase = time * speed;

  const innerFlap = Math.sin(phase) * amp + Math.cos(phase * 2) * 0.08 * amp;
  const outerFlap = Math.sin(phase - 0.55) * (amp * 0.88);

  rig.leftWingInner.rotation.z = -innerFlap;
  rig.leftWingOuter.rotation.z = -outerFlap;
  rig.rightWingInner.rotation.z = innerFlap;
  rig.rightWingOuter.rotation.z = outerFlap;

  rig.bodyGroup.position.y = -Math.sin(phase) * (calm ? 0.02 : 0.06);
  rig.bodyGroup.rotation.x = Math.cos(phase) * 0.05 - swoopAmount * 0.22;
  rig.tailGroup.rotation.x = -0.08 + Math.sin(phase - 0.8) * 0.09;
  rig.headGroup.rotation.x = 0.05 - Math.cos(phase) * 0.04;

  if (rig.haloMesh) {
    const pulse = 0.9 + 0.2 * Math.sin(time * 4.0);
    rig.haloMesh.scale.set(pulse, pulse, pulse);
  }
}
