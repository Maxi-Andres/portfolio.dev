/**
 * ============================================================
 *  ENGINE (logica pura del juego, sin React ni canvas)
 * ============================================================
 *
 * Acumula y muta el `World`. No sabe nada de como se dibuja ni de
 * como se leen las teclas: recibe input + delta de tiempo y avanza.
 */
import { GAME_CONFIG } from './config'
import { VEHICLES } from './sprites'
import type { Car, InputState, VehicleKind, World } from './types'

const cfg = GAME_CONFIG

// Tamaño de cada vehiculo derivado de su sprite + escala.
function dims(kind: VehicleKind) {
  return {
    width: VEHICLES[kind].cols * cfg.pixelScale,
    height: VEHICLES[kind].rows * cfg.pixelScale,
  }
}
const CAR = dims('car')

// Frame de referencia: las velocidades estan pensadas a 60fps.
const FRAME_MS = 1000 / 60

/** Calcula los limites de la ruta y el centro de cada carril. */
function computeRoad() {
  const roadLeft = cfg.road.grassWidth
  const roadRight = cfg.view.width - cfg.road.grassWidth
  const usable = roadRight - roadLeft
  const laneWidth = usable / cfg.lanes
  const laneCenters = Array.from(
    { length: cfg.lanes },
    (_, i) => roadLeft + laneWidth * (i + 0.5)
  )
  return { roadLeft, roadRight, laneCenters }
}

/** Crea un mundo nuevo, listo para empezar a jugar. */
export function createWorld(): World {
  const { roadLeft, roadRight, laneCenters } = computeRoad()
  const startX = laneCenters[cfg.player.startLane] ?? laneCenters[0]

  const player: Car = {
    x: startX - CAR.width / 2,
    y: cfg.view.height - cfg.player.bottomMargin - CAR.height,
    width: CAR.width,
    height: CAR.height,
    color: cfg.player.color,
    lane: cfg.player.startLane,
    kind: 'car',
  }

  return {
    player,
    enemies: [],
    laneCenters,
    roadLeft,
    roadRight,
    carWidth: CAR.width,
    carHeight: CAR.height,
    scrollY: 0,
    speed: cfg.traffic.baseSpeed,
    score: 0,
    spawnTimer: cfg.traffic.spawnIntervalMs,
    lastSpawnLane: -1,
    status: 'playing',
    crash: null,
  }
}

/** Mundo "de muestra" con vehiculos quietos para mostrar detras del
 *  boton de play (estado idle). */
export function createPreviewWorld(): World {
  const world = createWorld()
  // [lane, fila relativa (0 arriba - 1 abajo), color]
  const layout: [number, number, string][] = [
    [0, 0.1, '#3b7fd4'],
    [2, 0.02, '#e4b53b'],
    [4, 0.18, '#e7e9ea'],
    [1, 0.42, '#cf3a33'],
    [5, 0.36, '#c9ccce'],
    [3, 0.6, '#e7e9ea'],
    [0, 0.7, '#7b4fd0'],
  ]
  for (const [lane, t, color] of layout) {
    world.enemies.push({
      x: world.laneCenters[lane] - CAR.width / 2,
      y: t * cfg.view.height,
      width: CAR.width,
      height: CAR.height,
      color,
      lane,
      kind: 'car',
    })
  }
  world.status = 'idle'
  return world
}

function spawnEnemy(world: World, lane: number) {
  const color =
    cfg.traffic.colors[Math.floor(Math.random() * cfg.traffic.colors.length)]
  world.enemies.push({
    x: world.laneCenters[lane] - CAR.width / 2,
    y: -CAR.height,
    width: CAR.width,
    height: CAR.height,
    color,
    lane,
    kind: 'car',
  })
}

/**
 * Elige carriles para el proximo spawn. Con mas score aparecen mas
 * vehiculos a la vez, pero SIEMPRE quedan al menos 2 carriles libres.
 */
function spawnTraffic(world: World) {
  const lanes = [...Array(cfg.lanes).keys()].filter(
    (l) => l !== world.lastSpawnLane
  )
  for (let i = lanes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[lanes[i], lanes[j]] = [lanes[j], lanes[i]]
  }

  const doubleChance = Math.min(
    cfg.traffic.doubleSpawnMax,
    cfg.traffic.doubleSpawnChance + world.score * cfg.traffic.doubleSpawnGrowth
  )
  let count = 1
  if (Math.random() < doubleChance) count++
  if (Math.random() < doubleChance * 0.4) count++
  count = Math.min(count, cfg.lanes - 2, lanes.length)

  for (let i = 0; i < count; i++) spawnEnemy(world, lanes[i])
  world.lastSpawnLane = lanes[0]
}

/** Colision AABB con un pequeño margen para que sea "justa". */
function collides(a: Car, b: Car): boolean {
  const mx = a.width * 0.16
  const my = a.height * 0.12
  return (
    a.x + mx < b.x + b.width - mx &&
    a.x + a.width - mx > b.x + mx &&
    a.y + my < b.y + b.height - my &&
    a.y + a.height - my > b.y + my
  )
}

/** Centro del rectangulo de solape entre a y b (punto del impacto). */
function overlapCenter(a: Car, b: Car) {
  const x1 = Math.max(a.x, b.x)
  const x2 = Math.min(a.x + a.width, b.x + b.width)
  const y1 = Math.max(a.y, b.y)
  const y2 = Math.min(a.y + a.height, b.y + b.height)
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 }
}

/**
 * Avanza el mundo un frame. Devuelve true si el jugador choco
 * (game over) en este frame.
 */
export function updateWorld(
  world: World,
  input: InputState,
  dtMs: number
): boolean {
  const dt = dtMs / FRAME_MS // factor de frame (1 == 60fps)

  // Velocidad del mundo: sube con el score (cada vez mas rapido).
  const raw = cfg.traffic.baseSpeed + world.score * cfg.traffic.speedGrowth
  world.speed = Math.min(cfg.traffic.maxSpeed, raw)

  world.scrollY += world.speed * dt
  world.score += (cfg.scorePerSecond * dtMs) / 1000

  // --- Movimiento del jugador ---
  const player = world.player
  const minX = world.roadLeft
  const maxX = world.roadRight - player.width

  if (input.pointerX != null) {
    const targetX = input.pointerX - player.width / 2
    const maxStep = cfg.player.horizontalSpeed * 2.2 * dt
    const diff = targetX - player.x
    player.x += Math.max(-maxStep, Math.min(maxStep, diff))
  } else {
    let dir = 0
    if (input.left) dir -= 1
    if (input.right) dir += 1
    player.x += dir * cfg.player.horizontalSpeed * dt
  }
  player.x = Math.max(minX, Math.min(maxX, player.x))

  // --- Spawns ---
  world.spawnTimer -= dtMs
  if (world.spawnTimer <= 0) {
    spawnTraffic(world)
    world.spawnTimer = Math.max(
      cfg.traffic.minSpawnIntervalMs,
      cfg.traffic.spawnIntervalMs - world.score * cfg.traffic.spawnRampMs
    )
  }

  // --- Enemigos: bajan mas lento que la ruta (sensacion de velocidad) ---
  const enemySpeed = world.speed * cfg.traffic.enemySpeedFactor
  const alive: Car[] = []
  for (const enemy of world.enemies) {
    enemy.y += enemySpeed * dt
    if (collides(player, enemy)) {
      // No reasignamos world.enemies: queda el frame del choque tal cual
      // (con el vehiculo que choco encima del jugador) para congelarlo.
      world.crash = overlapCenter(player, enemy)
      world.status = 'gameover'
      return true
    }
    if (enemy.y < cfg.view.height) alive.push(enemy)
  }
  world.enemies = alive

  return false
}
