/**
 * ============================================================
 *  SPRITES (pixel art de los autos)
 * ============================================================
 *
 * Un auto es una grilla de caracteres. Cada caracter es un "tono"
 * de la pintura (se derivan del color base del auto) o un detalle fijo:
 *
 *    .  -> transparente (no se dibuja)
 *    H  -> brillo / highlight de la pintura (lado iluminado)
 *    L  -> pintura clara
 *    B  -> pintura base (EL color del auto)
 *    D  -> pintura oscura (lado en sombra)
 *    o  -> contorno (tono mas oscuro de la pintura)
 *    k  -> negro: ventanas, molduras, parantes
 *    r  -> faros traseros (rojo)
 *
 * El auto "mira hacia arriba" (el frente es la fila de arriba). La luz
 * entra desde la izquierda: por eso la izquierda usa H/L y la derecha D.
 * Como H/L/B/D/o se derivan de UN color, el mismo dibujo queda bien
 * pintado en cualquier color (azul, rojo, blanco, el negro del jugador...).
 *
 * Para editar el auto: cambia esta grilla (todas las filas con el mismo
 * largo) o los porcentajes de sombreado en `getPalette`.
 */
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

export const SPRITE_COLS = CAR_SPRITE[0].length
export const SPRITE_ROWS = CAR_SPRITE.length

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

// Cache de paletas: misma key de color -> mismo objeto, no recalcula por frame.
const paletteCache = new Map<string, Palette>()

function getPalette(color: string): Palette {
  let p = paletteCache.get(color)
  if (!p) {
    p = {
      H: shade(color, 0.4), // brillo
      L: shade(color, 0.16), // pintura clara
      B: color, // base
      D: shade(color, -0.16), // pintura en sombra
      o: shade(color, -0.34), // contorno
      k: '#16181d', // negro de ventanas / molduras
      r: '#ff3b30', // faros traseros
    }
    paletteCache.set(color, p)
  }
  return p
}

/**
 * Dibuja un auto en el canvas usando el sprite de pixel art.
 * @param cx  centro X del auto (px del mundo)
 * @param topY  borde superior del auto (px del mundo)
 * @param scale  px por celda del sprite
 */
export function drawCar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  topY: number,
  scale: number,
  color: string
): void {
  const palette = getPalette(color)
  const width = SPRITE_COLS * scale
  const left = Math.round(cx - width / 2)
  const top = Math.round(topY)

  for (let row = 0; row < SPRITE_ROWS; row++) {
    const line = CAR_SPRITE[row]
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === '.') continue
      ctx.fillStyle = palette[ch as keyof Palette]
      ctx.fillRect(left + col * scale, top + row * scale, scale, scale)
    }
  }
}

/**
 * Dibuja la silueta del auto en negro semitransparente, desplazada, para
 * simular la sombra proyectada sobre el asfalto.
 */
export function drawCarShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  topY: number,
  scale: number,
  offsetX: number,
  offsetY: number,
  alpha: number
): void {
  const width = SPRITE_COLS * scale
  const left = Math.round(cx - width / 2) + offsetX
  const top = Math.round(topY) + offsetY

  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
  for (let row = 0; row < SPRITE_ROWS; row++) {
    const line = CAR_SPRITE[row]
    for (let col = 0; col < line.length; col++) {
      if (line[col] === '.') continue
      ctx.fillRect(left + col * scale, top + row * scale, scale, scale)
    }
  }
}
