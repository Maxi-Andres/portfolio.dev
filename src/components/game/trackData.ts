// Datos compartidos del touge japonés: la pista (loop cerrado), la línea de
// meta + checkpoint para cronometrar vueltas, montañas y decorados. Todo lo
// aleatorio se genera una sola vez con un RNG seedeado para que el mapa se vea
// igual en cada visita y coincida entre el render y la lógica.

export type GameControls = {
  forward: boolean
  back: boolean
  left: boolean
  right: boolean
  // contador que incrementa el wrapper; el auto resetea cuando cambia
  resetCount: number
}

export const createControls = (): GameControls => ({
  forward: false,
  back: false,
  left: false,
  right: false,
  resetCount: 0,
})

// --- estado de cronometraje compartido entre el auto (useFrame) y el HUD ---
export type LapTiming = {
  status: 'idle' | 'running'
  lapStart: number // tiempo de clock al empezar la vuelta actual (s)
  current: number // vuelta actual transcurrida (s)
  last: number // última vuelta completada (s), 0 = ninguna
  best: number // mejor vuelta (s), 0 = ninguna
  laps: number // vueltas completadas
  rev: number // incrementa al completar una vuelta (para que el HUD detecte)
}

export const createTiming = (): LapTiming => ({
  status: 'idle',
  lapStart: 0,
  current: 0,
  last: 0,
  best: 0,
  laps: 0,
  rev: 0,
})

export const formatTime = (s: number) => {
  if (s <= 0) return '--:--.---'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  const ms = Math.floor((s % 1) * 1000)
  const pad = (n: number, l = 2) => String(n).padStart(l, '0')
  return m > 0
    ? `${m}:${pad(sec)}.${pad(ms, 3)}`
    : `${pad(sec)}.${pad(ms, 3)}`
}

export const PALETTE = {
  sky: '#aacbe0',
  fog: '#bcd4e0',
  ground: '#5f7d3f',
  groundDark: '#516b36',
  road: '#494d54',
  roadEdge: '#3c3f45',
  roadLine: '#e6e2cf',
  rail: '#d6d8da',
  railPost: '#8a8d90',
  mountain: '#4f7140',
  mountainDark: '#3e5b34',
  mountainRock: '#6f7a73',
  snow: '#eef3f2',
  cedar: '#2f5132',
  cedarLight: '#3c6740',
  trunk: '#6b4a2f',
  rock: '#9aa1a6',
  rockDark: '#82888d',
  torii: '#c0392b',
  toriiDark: '#9c2d22',
  guard: '#cfd2d4',
  signWhite: '#eef0f1',
  signPost: '#7d8084',
}

// RNG determinista (mulberry32)
const mulberry32 = (a: number) => () => {
  a |= 0
  a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const rand = mulberry32(0x86)
const range = (min: number, max: number) => min + rand() * (max - min)

export type Vec2 = { x: number; z: number }

// --- Centerline de la pista (loop cerrado vía Catmull-Rom) ---
const CONTROL: Vec2[] = [
  { x: 0, z: -26 },
  { x: 24, z: -22 },
  { x: 34, z: -4 },
  { x: 26, z: 14 },
  { x: 30, z: 30 },
  { x: 10, z: 36 },
  { x: -10, z: 32 },
  { x: -28, z: 22 },
  { x: -24, z: 2 },
  { x: -34, z: -16 },
  { x: -16, z: -30 },
]

const PER_SEG = 22

const catmullClosed = (pts: Vec2[], perSeg: number): Vec2[] => {
  const out: Vec2[] = []
  const m = pts.length
  for (let i = 0; i < m; i++) {
    const p0 = pts[(i - 1 + m) % m]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % m]
    const p3 = pts[(i + 2) % m]
    for (let j = 0; j < perSeg; j++) {
      const t = j / perSeg
      const t2 = t * t
      const t3 = t2 * t
      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3)
      const z =
        0.5 *
        (2 * p1.z +
          (-p0.z + p2.z) * t +
          (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 +
          (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3)
      out.push({ x, z })
    }
  }
  return out
}

export const CENTERLINE = catmullClosed(CONTROL, PER_SEG)
export const N = CENTERLINE.length

// Tangentes (dirección de avance) y normales (lado izquierdo)
export const TANGENTS: Vec2[] = []
export const NORMALS: Vec2[] = []
for (let i = 0; i < N; i++) {
  const a = CENTERLINE[(i - 1 + N) % N]
  const b = CENTERLINE[(i + 1) % N]
  let tx = b.x - a.x
  let tz = b.z - a.z
  const len = Math.hypot(tx, tz) || 1
  tx /= len
  tz /= len
  TANGENTS.push({ x: tx, z: tz })
  // normal izquierda en XZ
  NORMALS.push({ x: -tz, z: tx })
}

export const ROAD_HALF = 4.4
// límite duro (guardrail) para el centro del auto respecto al centerline
export const ROAD_LIMIT = ROAD_HALF + 0.7

// Typed arrays para la búsqueda del punto más cercano en cada frame
export const CL_X = new Float32Array(N)
export const CL_Z = new Float32Array(N)
for (let i = 0; i < N; i++) {
  CL_X[i] = CENTERLINE[i].x
  CL_Z[i] = CENTERLINE[i].z
}

export type NearRoad = {
  d: number // distancia al centerline
  px: number
  pz: number
}
const _near: NearRoad = { d: 0, px: 0, pz: 0 }
export const nearestRoad = (x: number, z: number): NearRoad => {
  let best = Infinity
  let bi = 0
  for (let i = 0; i < N; i++) {
    const dx = x - CL_X[i]
    const dz = z - CL_Z[i]
    const d2 = dx * dx + dz * dz
    if (d2 < best) {
      best = d2
      bi = i
    }
  }
  _near.d = Math.sqrt(best)
  _near.px = CL_X[bi]
  _near.pz = CL_Z[bi]
  return _near
}

// --- Meta y checkpoint ---
const START_I = 0
const startTan = TANGENTS[START_I]
export const START = {
  x: CENTERLINE[START_I].x,
  z: CENTERLINE[START_I].z,
  fx: startTan.x, // forward (dirección de cruce válida)
  fz: startTan.z,
  nx: NORMALS[START_I].x, // normal (a lo ancho de la ruta)
  nz: NORMALS[START_I].z,
}
// checkpoint en el lado opuesto del loop: hay que pasarlo para validar la vuelta
const CHECK_I = Math.floor(N / 2)
export const CHECKPOINT = {
  x: CENTERLINE[CHECK_I].x,
  z: CENTERLINE[CHECK_I].z,
}
export const CHECK_RADIUS = ROAD_HALF + 3

// Spawn unos puntos "antes" de la meta para que el primer cruce arranque limpio
const SPAWN_I = (START_I - 8 + N) % N
const spawnTan = TANGENTS[SPAWN_I]
export const SPAWN = {
  x: CENTERLINE[SPAWN_I].x,
  z: CENTERLINE[SPAWN_I].z,
  // forward = (cos h, -sin h)  =>  h = atan2(-tz, tx)
  heading: Math.atan2(-spawnTan.z, spawnTan.x),
}

// --- Postes de guardrail a ambos lados (visual) ---
export type RailPost = { x: number; z: number }
export const RAIL_LEFT: RailPost[] = []
export const RAIL_RIGHT: RailPost[] = []
for (let i = 0; i < N; i += 4) {
  const p = CENTERLINE[i]
  const n = NORMALS[i]
  const off = ROAD_HALF + 0.35
  RAIL_LEFT.push({ x: p.x + n.x * off, z: p.z + n.z * off })
  RAIL_RIGHT.push({ x: p.x - n.x * off, z: p.z - n.z * off })
}

// --- Montañas en anillo alrededor de la pista ---
export type Mountain = {
  x: number
  z: number
  r: number
  h: number
  snow: boolean
  rot: number
}
export const MOUNTAINS: Mountain[] = []
{
  const count = 16
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + range(-0.12, 0.12)
    const dist = range(62, 95)
    const h = range(22, 48)
    MOUNTAINS.push({
      x: Math.cos(a) * dist,
      z: Math.sin(a) * dist,
      r: range(20, 34),
      h,
      snow: h > 36,
      rot: range(0, Math.PI),
    })
  }
}

// helper: ¿está libre este punto? (lejos de la ruta y dentro del valle)
const onRoad = (x: number, z: number, margin: number) => {
  for (let i = 0; i < N; i++) {
    const dx = x - CL_X[i]
    const dz = z - CL_Z[i]
    if (dx * dx + dz * dz < margin * margin) return true
  }
  return false
}

// --- Cedros japoneses (conos altos) ---
export type Tree = { x: number; z: number; s: number; light: boolean }
export const TREES: Tree[] = []
{
  let tries = 0
  while (TREES.length < 70 && tries < 2000) {
    tries++
    const a = range(0, Math.PI * 2)
    const r = range(8, 52)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (onRoad(x, z, ROAD_HALF + 3)) continue
    TREES.push({ x, z, s: range(0.8, 1.7), light: rand() > 0.5 })
  }
}

// --- Rocas sueltas al borde ---
export type Rock = { x: number; z: number; s: number; rot: number }
export const ROCKS: Rock[] = []
{
  let tries = 0
  while (ROCKS.length < 20 && tries < 800) {
    tries++
    const a = range(0, Math.PI * 2)
    const r = range(7, 46)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (onRoad(x, z, ROAD_HALF + 2)) continue
    ROCKS.push({ x, z, s: range(0.5, 1.4), rot: range(0, Math.PI * 2) })
  }
}

// --- Torii rojo al costado de la ruta ---
const torP = CENTERLINE[Math.floor(N * 0.7)]
const torN = NORMALS[Math.floor(N * 0.7)]
export const TORII = {
  x: torP.x + torN.x * (ROAD_HALF + 4),
  z: torP.z + torN.z * (ROAD_HALF + 4),
  rot: Math.atan2(torN.x, torN.z),
}
