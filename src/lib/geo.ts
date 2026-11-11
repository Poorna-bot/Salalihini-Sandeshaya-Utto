export const MAP = {
  width: 68,
  depth: 48,
  segX: 250,
  segZ: 176,
  water: 0,
  skirt: -2.4
} as const;

export interface Landmark {
  id: string;
  si: string;
  en: string;
  x: number;
  z: number;
  from: number;
  to: number;
  pin: number;
  pad: number;
  blurbSi: string;
  blurbEn: string;
}

export const LANDMARKS: Landmark[] = [
  {
    id: "kotte",
    si: "ජයවර්ධනපුර කෝට්ටේ",
    en: "Jayawardhanapura (Kotte)",
    x: 0,
    z: 5,
    from: 1,
    to: 16,
    pin: 3.2,
    pad: 2.3,
    blurbSi: "දියවන්නා ඔයෙන් හා ශක්තිමත් පවුරින් වට වූ සවැනි පැරකුම්බා රජුගේ රාජධානි අගනුවර.",
    blurbEn: "The fortified water-ringed capital of King Parakramabahu VI, where the starling receives her mission."
  },
  {
    id: "dalada",
    si: "දළදා මැදුර",
    en: "Tooth Relic shrine",
    x: 1.25,
    z: 5.7,
    from: 17,
    to: 17,
    pin: 2.2,
    pad: 0.9,
    blurbSi: "සඳ රැස් මෙන් සුදු පැහැ විහිදුවන උතුම් දළදා වහන්සේ වැඩ සිටින තෙමහල් ප්‍රාසාදය.",
    blurbEn: "The three-storeyed shrine inside Kotte housing the Sacred Tooth Relic of the Buddha."
  },
  {
    id: "palace",
    si: "රජ මැදුර",
    en: "The royal palace",
    x: -0.9,
    z: 4.3,
    from: 18,
    to: 21,
    pin: 2.4,
    pad: 1.0,
    blurbSi: "රන් කොත් හා මුතු වැල්වලින් සැරසුණු පැරකුම්බා මහ රජුගේ රාජකීය මන්දිරය සහ කොන්තගංතොට නික්මුම.",
    blurbEn: "King Parakramabahu VI's moonstone-walled palace, from which the bird departs via Kontagantota."
  },
  {
    id: "kovil",
    si: "ඊශ්වර කෝවිල",
    en: "Isvara kovil",
    x: -0.8,
    z: 1.3,
    from: 22,
    to: 24,
    pin: 2.5,
    pad: 0.9,
    blurbSi: "සුවඳ දුම්, මිහිඟු බෙර සහ දෙමළ ස්තෝත්‍ර ගී මැද සැළලිහිණිය රාත්‍රිය ගත කරන ශිව කෝවිල.",
    blurbEn: "The Hindu shrine of Siva where the starling rests overnight amid camphor smoke and Tamil hymns."
  },
  {
    id: "samanala",
    si: "සමනොළ කන්ද",
    en: "Samanalakanda (Adam's Peak)",
    x: 24,
    z: 4.5,
    from: 25,
    to: 26,
    pin: 8.6,
    pad: 0,
    blurbSi: "නැගෙනහිර ක්ෂිතිජයේ බබළන, බුදුරදුන්ගේ සිරිපා පියුම පිහිටි ශුද්ධ වූ කඳු මුදුන.",
    blurbEn: "Rising in the far east, the sacred peak bearing the footprint of the Buddha and revered by God Saman."
  },
  {
    id: "sea",
    si: "මහ මුහුද",
    en: "The great ocean",
    x: -14.5,
    z: -3,
    from: 27,
    to: 28,
    pin: 1.8,
    pad: 0,
    blurbSi: "මුතු, සක් හා පබළු ගැවසි වෙරළ තීරය සහ අහස සිඹින රළ පෙළින් යුතු බටහිර-උතුරු මහ සයුර.",
    blurbEn: "The western sea gleaming with pearls, conch shells, and coral as waves leap toward the sky."
  },
  {
    id: "sapumal",
    si: "සපුමල් කුමරුගේ සේනාව",
    en: "Prince Sapumal's army",
    x: -1.5,
    z: -1.7,
    from: 29,
    to: 40,
    pin: 2.2,
    pad: 0.9,
    blurbSi: "යාපාපටුන ජයගෙන නිල් අසු පිට නැඟී පැමිණෙන සපුමල් කුමරුන් සහ කයිකාවල මුරපොළ ඇතුළු ගම්බිම්.",
    blurbEn: "Commander Prince Sapumal returning victorious from Jaffna, followed by Kaikavala, groves, and golden paddy fields."
  },
  {
    id: "kitsiri",
    si: "කිත්සිරිමෙවන් වෙහෙර",
    en: "Kitsirimevan Vihara",
    x: -1.0,
    z: -4.2,
    from: 41,
    to: 42,
    pin: 2.2,
    pad: 0.9,
    blurbSi: "කැලණි ගඟ දකුණු ඉවුරේ පිහිටි, පස්වරුවේ සැළලිහිණිය වැඳ පුදන ඓතිහාසික විහාරස්ථානය.",
    blurbEn: "The afternoon sanctuary on the south bank of the Kelani River where the bird honours the stupa and Bo tree."
  },
  {
    id: "kelani",
    si: "කැලණි ගඟ",
    en: "The Kelani River",
    x: -2.6,
    z: -8.1,
    from: 43,
    to: 52,
    pin: 1.8,
    pad: 0,
    blurbSi: "නාග කන්‍යාවන් වීණා වයමින් බුදු ගුණ ගයන සිහිල් ගං තීරය, සැඳෑ හිරු බැසීම සහ මස්කෙළිය.",
    blurbEn: "Shaded riverbanks where naga maidens sing to the veena, sunset crimsons the sky, and fish leap at Maskeliya."
  },
  {
    id: "kelaniya",
    si: "කැලණි විහාරය",
    en: "Kelaniya temple",
    x: -1.0,
    z: -7.0,
    from: 53,
    to: 71,
    pin: 3.2,
    pad: 1.5,
    blurbSi: "බුදුරදුන් වැඩම කළ පින්බිමෙහි පිහිටි මහ දාගැබ, පිළිම ගෙවල්, බෝධිය සහ සිවුරු දාගැබ.",
    blurbEn: "The hallowed city and temple of Kelaniya—stupa, reclining and samadhi images, Bo tree, and Robe Stupa."
  },
  {
    id: "devale",
    si: "විභීෂණ දෙව් මැදුර",
    en: "Vibhishana's shrine",
    x: 0.9,
    z: -6.2,
    from: 72,
    to: 111,
    pin: 2.6,
    pad: 1.0,
    blurbSi: "නළඟනන්ගේ රැඟුම් මැද වැඩ හිඳින විභීෂණ දෙවිඳුන්ට උලකුඩය දේවිය වෙනුවෙන් හසුන ඔප්පු කරන දෙවොල.",
    blurbEn: "The shrine of God Vibhishana where dancers perform and the starling delivers her royal prayer for a son."
  }
];

export const SCENERY_LABELS = [
  { id: "colombo", si: "කොළඹ", en: "Colombo Port", x: -7.8, y: 1.2, z: -2.4 },
  { id: "estuary", si: "කැලණි මෝය", en: "Kelani Estuary", x: -9.5, y: 1.0, z: -9.4 }
] as const;

export const RIVER_POINTS: [number, number][] = [
  [-12, -9.2],
  [-8.5, -9.9],
  [-5.2, -9.1],
  [-2.2, -8.7],
  [0.8, -9.6],
  [4.2, -8.6],
  [8, -10.2],
  [12, -9],
  [17, -11.6],
  [23, -10],
  [34, -12.5]
];

export const ROUTE_NODES: [number, number][] = [
  [-0.9, 4.3],  // 0 palace
  [-0.5, 2.7],  // 1 Kontagantota crossing
  [-0.8, 1.3],  // 2 Isvara kovil
  [-1.5, -0.4], // 3
  [-1.5, -1.7], // 4 Sapumal's army
  [-1.1, -2.9], // 5 Guruluketa fields
  [-1.0, -4.2], // 6 Kitsirimevan Vihara
  [-1.2, -5.0], // 7
  [-2.4, -7.1], // 8 Kelani riverbank
  [-1.0, -6.8], // 9 Kelaniya Temple
  [0.9, -6.2]   // 10 Vibhishana Devale
];

export const VERSE_ANCHORS: [number, number][] = [
  [1, 0],
  [16, 0],
  [21, 0.7],
  [22, 2],
  [24, 2],
  [25, 3],
  [29, 4],
  [41, 6],
  [42, 6],
  [43, 7],
  [52, 8],
  [53, 9],
  [71, 9],
  [72, 10],
  [111, 10]
];

export function coastX(z: number): number {
  return -9.5 + 1.6 * Math.sin(0.28 * z + 0.4) + 0.8 * Math.sin(0.75 * z + 1.8);
}

function hash2(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

export function fbm(x: number, z: number): number {
  let v = 0;
  let amp = 0.55;
  let freq = 0.16;
  for (let i = 0; i < 4; i++) {
    v += amp * valueNoise(x * freq, z * freq);
    freq *= 2.02;
    amp *= 0.5;
  }
  return v; // 0..1.05
}

export function riverDistance(x: number, z: number): { dist: number; width: number } {
  let minDist = 999;
  let bestT = 0;
  for (let i = 0; i < RIVER_POINTS.length - 1; i++) {
    const [x1, z1] = RIVER_POINTS[i];
    const [x2, z2] = RIVER_POINTS[i + 1];
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len2 = dx * dx + dz * dz || 1;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (z - z1) * dz) / len2));
    const px = x1 + t * dx;
    const pz = z1 + t * dz;
    const d = Math.hypot(x - px, z - pz);
    if (d < minDist) {
      minDist = d;
      bestT = (i + t) / (RIVER_POINTS.length - 1);
    }
  }
  const width = 0.95 * (1 - bestT * 0.48);
  return { dist: minDist, width };
}

export function sampleTerrainHeight(x: number, z: number): number {
  const cx = coastX(z);
  const seaDelta = x - cx;

  // Deep ocean to the west
  if (seaDelta < -2.2) return -0.95;

  // Smooth transition from seabed (-0.95) across the beach (0.0) onto the green mainland (+0.32..+1.2)
  const coastBlend = Math.max(0, Math.min(1, (seaDelta + 2.2) / 3.2));
  const smoothCoast = coastBlend * coastBlend * (3 - 2 * coastBlend);
  const noiseVal = fbm(x, z);

  // Mainland base height is well ABOVE water (0.28 to 1.15)
  let h = -0.95 + smoothCoast * (1.22 + noiseVal * 0.85);

  // Rolling interior hills & eastern mountain range
  if (x > 4) {
    const inland = Math.min(1, (x - 4) / 22);
    h += inland * inland * (2.6 + noiseVal * 1.8);
  }

  // Samanalakanda (Adam's Peak) at (24, 4.5) and flanking central highlands
  const dPeak = Math.hypot(x - 24, z - 4.5);
  h += 7.4 * Math.exp(-(dPeak * dPeak) / 11.5);

  const dRidge1 = Math.hypot(x - 21, z - 1.5);
  h += 4.2 * Math.exp(-(dRidge1 * dRidge1) / 16);

  const dRidge2 = Math.hypot(x - 26, z + 3.5);
  h += 3.8 * Math.exp(-(dRidge2 * dRidge2) / 18);

  // Diyawanna lake moat around Kotte (0, 5), with a causeway on the north side (Kontagantota)
  const dKotte = Math.hypot(x - 0, z - 5);
  const isNorthCauseway = z < 3.4 && Math.abs(x + 0.6) < 0.85;
  if (dKotte > 2.05 && dKotte < 3.35 && !isNorthCauseway) {
    const ringT = (dKotte - 2.05) / 1.3;
    const moatDepth = Math.sin(ringT * Math.PI);
    h = Math.min(h, 0.25 - moatDepth * 0.65);
  }

  // Kelani river valley carving
  const { dist, width } = riverDistance(x, z);
  if (dist < width * 1.65 && seaDelta > -0.5) {
    const rBlend = Math.max(0, Math.min(1, dist / (width * 1.65)));
    const smoothRiver = rBlend * rBlend * (3 - 2 * rBlend);
    const riverBed = -0.38;
    h = riverBed * (1 - smoothRiver) + h * smoothRiver;
  }

  // Levelled elevated pads for landmarks
  for (const lm of LANDMARKS) {
    if (lm.pad > 0) {
      const d = Math.hypot(x - lm.x, z - lm.z);
      if (d < lm.pad * 1.45) {
        const w = Math.max(0, Math.min(1, (d - lm.pad * 0.7) / (lm.pad * 0.75)));
        const smooth = w * w * (3 - 2 * w);
        const padHeight = 0.42;
        h = padHeight * (1 - smooth) + h * smooth;
      }
    }
  }

  return h;
}

export function verseToRouteFraction(verse: number): number {
  const v = Math.max(1, Math.min(111, verse));
  for (let i = 0; i < VERSE_ANCHORS.length - 1; i++) {
    const [v0, n0] = VERSE_ANCHORS[i];
    const [v1, n1] = VERSE_ANCHORS[i + 1];
    if (v >= v0 && v <= v1) {
      const t = v1 === v0 ? 0 : (v - v0) / (v1 - v0);
      return (n0 + t * (n1 - n0)) / (ROUTE_NODES.length - 1);
    }
  }
  return 1;
}
