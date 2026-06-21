/**
 * ============================================================
 *  RENDER (todo lo que dibuja en el canvas)
 * ============================================================
 *
 * Pinta la escena: pasto -> asfalto -> lineas -> sombras -> autos.
 * El movimiento "hacia adelante" se simula desplazando las lineas
 * punteadas y los mechones de pasto segun `world.scrollY`.
 */
import { GAME_CONFIG } from './config'
import { drawCar, drawCarShadow } from './sprites'
import type { Car, World } from './types'

const cfg = GAME_CONFIG

/** Pseudo-aleatorio determinista (mismo input -> mismo output). Sirve
 *  para que los mechones de pasto sean estables mientras "scrollean". */
function rand(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function drawGrass(ctx: CanvasRenderingContext2D, world: World) {
  const { width, height } = cfg.view
  const r = cfg.road

  // Base: verde externo en todo el canvas.
  ctx.fillStyle = r.grassOuter
  ctx.fillRect(0, 0, width, height)

  // Banda de verde mas claro pegada a la ruta (a ambos lados).
  ctx.fillStyle = r.grassInner
  ctx.fillRect(world.roadLeft - 12, 0, 12, height)
  ctx.fillRect(world.roadRight, 0, 12, height)

  // Mechones de pasto en varios verdes, que bajan con el scroll.
  const period = r.tuftSpacing
  const startRow = Math.floor(world.scrollY / period)
  const totalRows = Math.ceil(height / period) + 2
  const bands: [number, number, number][] = [
    [4, world.roadLeft - 8, 0], // costado izquierdo
    [world.roadRight + 8, width - 4, 500], // costado derecho
  ]

  for (let k = 0; k < totalRows; k++) {
    const rowId = startRow - k
    const y = Math.round(world.scrollY - rowId * period)
    for (const [xMin, xMax, seedShift] of bands) {
      const seed = rowId * 1.13 + seedShift
      const x = Math.round(xMin + rand(seed) * (xMax - xMin))
      const color = r.grassTufts[Math.floor(rand(seed * 3.3) * r.grassTufts.length)]
      const size = r.tuftSize + (rand(seed * 5.1) > 0.6 ? 2 : 0)
      ctx.fillStyle = color
      ctx.fillRect(x, y, size, size)
    }
  }

  // Franja oscura de transicion pasto -> asfalto.
  ctx.fillStyle = r.grassEdge
  ctx.fillRect(world.roadLeft - 4, 0, 4, height)
  ctx.fillRect(world.roadRight, 0, 4, height)
}

function drawRoad(ctx: CanvasRenderingContext2D, world: World) {
  const { height } = cfg.view
  const r = cfg.road
  const roadW = world.roadRight - world.roadLeft

  // Asfalto con gradiente: mas claro al centro, mas oscuro a los costados.
  const grad = ctx.createLinearGradient(world.roadLeft, 0, world.roadRight, 0)
  grad.addColorStop(0, r.asphaltEdge)
  grad.addColorStop(0.5, r.asphaltCenter)
  grad.addColorStop(1, r.asphaltEdge)
  ctx.fillStyle = grad
  ctx.fillRect(world.roadLeft, 0, roadW, height)

  // Carriles alternos un poco mas oscuros -> bandas verticales sutiles.
  const laneWidth = roadW / cfg.lanes
  ctx.fillStyle = `rgba(0, 0, 0, ${r.laneTint})`
  for (let i = 0; i < cfg.lanes; i += 2) {
    ctx.fillRect(world.roadLeft + laneWidth * i, 0, laneWidth, height)
  }

  // Lineas solidas del borde (banquina).
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
  drawRoad(ctx, world)

  const cars: Car[] = [...world.enemies, world.player]
  const s = cfg.shadow

  // 1) Todas las sombras primero (asi ninguna tapa a otro auto).
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

  // 2) Las carrocerias encima.
  for (const car of cars) {
    drawCar(ctx, car.x + car.width / 2, car.y, cfg.pixelScale, car.color)
  }
}
