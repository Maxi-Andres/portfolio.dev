/**
 * ============================================================
 *  SPRITES (pixel art de los vehiculos)
 * ============================================================
 *
 * Cada vehiculo es una grilla de caracteres. Cada caracter es un "tono"
 * de la pintura (derivado del color base) o un detalle fijo:
 *
 *    .  -> transparente        H -> brillo        L -> pintura clara
 *    B  -> pintura base        D -> pintura sombra o -> contorno
 *    k  -> negro (ventanas / molduras)            r -> luces traseras
 *
 * El vehiculo "mira hacia arriba" (frente = fila de arriba). La luz
 * entra desde la izquierda. Como H/L/B/D/o se derivan de UN color, el
 * mismo dibujo queda bien en cualquier color.
 *
 * Para editar un vehiculo: cambia su grilla (filas del mismo largo) o
 * agrega uno nuevo a VEHICLES.
 */
import type { VehicleKind } from './types'

export const CAR_SPRITE = [
  '....oooooo....',
  '..oHLBBBBDDo..',
  '.oHLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.oLkkkkkkkkDo.',
  'ooLLkkkkkkDDoo',
  '.oLkkkkkkkkDo.',
  '.oLLBBBBBBDDo.',
  '.oLkBBBBBBkDo.',
  '.oLkBBBBBBkDo.',
  '.oLkBBBBBBkDo.',
  '.oLkBBBBBBkDo.',
  '.oLkBBBBBBkDo.',
  '.oLkBBBBBBkDo.',
  '.oLLBBBBBBDDo.',
  '.oLkkkkkkkkDo.',
  '.oLkkkkkkkkDo.',
  '.oLkkkkkkkkDo.',
  '.oLLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.oLLBBBBBBDDo.',
  '.orLBBBBBBLro.',
  '....oooooo....',
]

export interface Vehicle {
  sprite: string[]
  cols: number
  rows: number
}

export const VEHICLES: Record<VehicleKind, Vehicle> = {
  car: { sprite: CAR_SPRITE, cols: CAR_SPRITE[0].length, rows: CAR_SPRITE.length },
}

interface Palette {
  H: string
  L: string
  B: string
  D: string
  o: string
  k: string
  r: string
}

/** Aclara/oscurece un color hex en `percent` (-1 a 1). */
function shade(hex: string, percent: number): string {
  const n = parseInt(hex.slice(1), 16)
  const amt = Math.round(255 * percent)
  const clamp = (v: number) => Math.max(0, Math.min(255, v))
  const r = clamp((n >> 16) + amt)
  const g = clamp(((n >> 8) & 0xff) + amt)
  const b = clamp((n & 0xff) + amt)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

const paletteCache = new Map<string, Palette>()

function getPalette(color: string): Palette {
  let p = paletteCache.get(color)
  if (!p) {
    p = {
      H: shade(color, 0.4),
      L: shade(color, 0.16),
      B: color,
      D: shade(color, -0.16),
      o: shade(color, -0.34),
      k: '#16181d',
      r: '#ff3b30',
    }
    paletteCache.set(color, p)
  }
  return p
}

/** Dibuja un vehiculo en el canvas. cx = centro X, topY = borde superior. */
export function drawVehicle(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  cx: number,
  topY: number,
  scale: number,
  color: string
): void {
  const palette = getPalette(color)
  const width = sprite[0].length * scale
  const left = Math.round(cx - width / 2)
  const top = Math.round(topY)

  for (let row = 0; row < sprite.length; row++) {
    const line = sprite[row]
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === '.') continue
      ctx.fillStyle = palette[ch as keyof Palette]
      ctx.fillRect(left + col * scale, top + row * scale, scale, scale)
    }
  }
}

/** Sombra del vehiculo (silueta negra semitransparente, desplazada). */
export function drawVehicleShadow(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  cx: number,
  topY: number,
  scale: number,
  offsetX: number,
  offsetY: number,
  alpha: number
): void {
  const width = sprite[0].length * scale
  const left = Math.round(cx - width / 2) + offsetX
  const top = Math.round(topY) + offsetY

  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
  for (let row = 0; row < sprite.length; row++) {
    const line = sprite[row]
    for (let col = 0; col < line.length; col++) {
      if (line[col] === '.') continue
      ctx.fillRect(left + col * scale, top + row * scale, scale, scale)
    }
  }
}

/** Efecto de choque: un "destello" pixelado de impacto en (x, y). */
export function drawCrash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  const cx = Math.round(x)
  const cy = Math.round(y)
  // Rayos del impacto (blanco / amarillo / naranja).
  const spikes: [number, number, number][] = [
    [0, -16, 5],
    [0, 14, 5],
    [-16, 0, 5],
    [15, 0, 5],
    [-11, -11, 4],
    [11, -11, 4],
    [-11, 11, 4],
    [11, 11, 4],
  ]
  ctx.fillStyle = '#ffd84a'
  for (const [dx, dy, s] of spikes) {
    ctx.fillRect(cx + dx - s / 2, cy + dy - s / 2, s, s)
  }
  // Nucleo blanco/naranja.
  ctx.fillStyle = '#ff7a2f'
  ctx.fillRect(cx - 9, cy - 9, 18, 18)
  ctx.fillStyle = '#ffe98a'
  ctx.fillRect(cx - 6, cy - 6, 12, 12)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(cx - 3, cy - 3, 6, 6)
}
