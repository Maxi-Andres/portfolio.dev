/**
 * ============================================================
 *  RENDER (todo lo que dibuja en el canvas)
 * ============================================================
 *
 * Escena: pasto (textura + flores + arboles) -> arena -> asfalto
 * -> lineas -> sombras -> autos. Los bordes pasto/arena/ruta son
 * irregulares (dentados). La decoracion y las lineas "bajan" con
 * `world.scrollY` para dar sensacion de velocidad.
 */
import { GAME_CONFIG } from './config'
import { drawCar, drawCarShadow } from './sprites'
import type { Car, World } from './types'

const cfg = GAME_CONFIG
const sc = cfg.scenery

/** Pseudo-aleatorio determinista: mismo input -> mismo output. Hace que
 *  la decoracion y los bordes sean estables mientras "scrollean". */
function rand(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/** Jitter centrado en 0, en [-amp, amp], determinista por fila. */
function jitter(rowId: number, seed: number, amp: number): number {
  return Math.round((rand(rowId * 1.13 + seed) * 2 - 1) * amp)
}

/** Recorre filas que bajan con el scroll. Empieza en k=-1 para que la
 *  fila de mas arriba cubra desde y<0 (sino queda una tira sin pintar
 *  arriba de todo segun el offset del scroll). */
function eachRow(
  scrollY: number,
  spacing: number,
  cb: (rowId: number, y: number) => void
) {
  const startRow = Math.floor(scrollY / spacing)
  const total = Math.ceil(cfg.view.height / spacing) + 2
  for (let k = -1; k < total; k++) {
    const rowId = startRow - k
    cb(rowId, Math.round(scrollY - rowId * spacing))
  }
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  red: boolean
) {
  const s = 2
  ctx.fillStyle = red ? sc.flowerRed : sc.flowerWhite
  ctx.fillRect(cx - s, cy, s, s)
  ctx.fillRect(cx + s, cy, s, s)
  ctx.fillRect(cx, cy - s, s, s)
  ctx.fillRect(cx, cy + s, s, s)
  ctx.fillStyle = sc.flowerYellow
  ctx.fillRect(cx, cy, s, s)
}

function drawTree(ctx: CanvasRenderingContext2D, cx: number, baseY: number) {
  ctx.fillStyle = sc.treeTrunk
  ctx.fillRect(cx - 2, baseY - 4, 4, 6)
  const cy = baseY - 12
  ctx.fillStyle = sc.treeLeaf
  ctx.fillRect(cx - 8, cy - 3, 16, 9)
  ctx.fillRect(cx - 5, cy - 8, 10, 18)
  ctx.fillRect(cx - 7, cy - 6, 14, 13)
  ctx.fillStyle = sc.treeLeafLight
  ctx.fillRect(cx - 6, cy - 6, 6, 5)
  ctx.fillStyle = sc.treeLeafDark
  ctx.fillRect(cx + 1, cy + 2, 6, 5)
}

/** Pasto de fondo + textura + flores/arboles (solo en las bandas laterales). */
function drawGrass(ctx: CanvasRenderingContext2D, world: World) {
  const { width, height } = cfg.view
  const margin = cfg.road.sandWidth + cfg.road.edgeJitter + 6

  ctx.fillStyle = sc.grassBase
  ctx.fillRect(0, 0, width, height)

  const bands = [
    { min: 6, max: world.roadLeft - margin, shift: 0 },
    { min: world.roadRight + margin, max: width - 6, shift: 500 },
  ]

  // Textura (speckles claros/oscuros).
  eachRow(world.scrollY, sc.speckleSpacing, (rowId, y) => {
    for (const b of bands) {
      if (b.max <= b.min) continue
      const seed = rowId * 2.3 + b.shift
      const x = Math.round(b.min + rand(seed) * (b.max - b.min))
      ctx.fillStyle = rand(seed * 1.7) > 0.5 ? sc.grassDark : sc.grassLight
      ctx.fillRect(x, y, 3, 3)
      const x2 = Math.round(b.min + rand(seed * 5.1) * (b.max - b.min))
      ctx.fillStyle = rand(seed * 2.9) > 0.5 ? sc.grassLight : sc.grassDark
      ctx.fillRect(x2, y + 5, 2, 2)
    }
  })

  // Flores y arboles.
  eachRow(world.scrollY, sc.decorSpacing, (rowId, y) => {
    for (const b of bands) {
      if (b.max - b.min < 24) continue
      const seed = rowId * 1.7 + b.shift
      const roll = rand(seed)
      const x = Math.round(b.min + 10 + rand(seed * 3.3) * (b.max - b.min - 20))
      if (roll < sc.treeChance) drawTree(ctx, x, y)
      else if (roll < sc.treeChance + sc.flowerChance)
        drawFlower(ctx, x, y, rand(seed * 7.1) > 0.65)
    }
  })
}

/** Asfalto + arena con bordes dentados (se dibuja fila por fila). */
function drawTrack(ctx: CanvasRenderingContext2D, world: World) {
  const r = cfg.road
  const amp = r.edgeJitter
  const sand = r.sandWidth

  const grad = ctx.createLinearGradient(world.roadLeft, 0, world.roadRight, 0)
  grad.addColorStop(0, r.asphaltEdge)
  grad.addColorStop(0.5, r.asphaltCenter)
  grad.addColorStop(1, r.asphaltEdge)

  eachRow(world.scrollY, r.edgeStep, (rowId, y) => {
    const h = r.edgeStep + 1 // solape para que no queden huecos
    // Bordes de la ruta (dentados) y de la arena con el pasto (otro dentado).
    const leftRoad = world.roadLeft + jitter(rowId, 3, amp)
    const rightRoad = world.roadRight + jitter(rowId, 31, amp)
    const leftSand = world.roadLeft - sand + jitter(rowId, 53, amp)
    const rightSand = world.roadRight + sand + jitter(rowId, 71, amp)

    // Arena (debajo, contra el pasto).
    ctx.fillStyle = sc.sand
    ctx.fillRect(leftSand, y, leftRoad - leftSand, h)
    ctx.fillRect(rightRoad, y, rightSand - rightRoad, h)

    // Textura de la arena.
    ctx.fillStyle = sc.sandDark
    ctx.fillRect(leftSand + 2 + (rowId % 3), y, 2, 2)
    ctx.fillRect(rightRoad + 3 + (rowId % 4), y, 2, 2)

    // Asfalto encima.
    ctx.fillStyle = grad
    ctx.fillRect(leftRoad, y, rightRoad - leftRoad, h)
  })
}

/** Lineas de la ruta: tinte por carril, bordes solidos y rayas punteadas. */
function drawLines(ctx: CanvasRenderingContext2D, world: World) {
  const { height } = cfg.view
  const r = cfg.road
  const roadW = world.roadRight - world.roadLeft
  const laneWidth = roadW / cfg.lanes

  // Carriles alternos un poco mas oscuros.
  ctx.fillStyle = `rgba(0, 0, 0, ${r.laneTint})`
  for (let i = 0; i < cfg.lanes; i += 2) {
    ctx.fillRect(world.roadLeft + laneWidth * i, 0, laneWidth, height)
  }

  // Lineas solidas del borde.
  ctx.fillStyle = r.edgeLine
  ctx.fillRect(world.roadLeft + r.shoulderWidth, 0, 2, height)
  ctx.fillRect(world.roadRight - r.shoulderWidth - 2, 0, 2, height)

  // Lineas punteadas entre carriles (se mueven con scrollY).
  ctx.fillStyle = r.laneLine
  const dashPeriod = r.dashLength + r.dashGap
  const offset = world.scrollY % dashPeriod
  for (let i = 1; i < cfg.lanes; i++) {
    const x = Math.round(world.roadLeft + laneWidth * i - r.dashWidth / 2)
    for (let y = offset - dashPeriod; y < height; y += dashPeriod) {
      ctx.fillRect(x, Math.round(y), r.dashWidth, r.dashLength)
    }
  }
}

/** Dibuja un frame completo del mundo. */
export function renderWorld(ctx: CanvasRenderingContext2D, world: World) {
  ctx.imageSmoothingEnabled = false
  drawGrass(ctx, world)
  drawTrack(ctx, world)
  drawLines(ctx, world)

  const cars: Car[] = [...world.enemies, world.player]
  const s = cfg.shadow

  for (const car of cars) {
    drawCarShadow(
      ctx,
      car.x + car.width / 2,
      car.y,
      cfg.pixelScale,
      s.offsetX,
      s.offsetY,
      s.alpha
    )
  }
  for (const car of cars) {
    drawCar(ctx, car.x + car.width / 2, car.y, cfg.pixelScale, car.color)
  }
}
