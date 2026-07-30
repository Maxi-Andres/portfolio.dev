'use client'
import React, { useCallback, useMemo, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

// Paleta completa de acentos Catppuccin (los mismos del selector de la pagina)
const COLORS = [
  '#f5e0dc', // rosewater
  '#f2cdcd', // flamingo
  '#f5c2e7', // pink
  '#cba6f7', // mauve
  '#f38ba8', // red
  '#eba0ac', // maroon
  '#fab387', // peach
  '#f9e2af', // yellow
  '#a6e3a1', // green
  '#94e2d5', // teal
  '#89dceb', // sky
  '#74c7ec', // sapphire
  '#89b4fa', // blue
  '#b4befe', // lavender
]

const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

// --- Grilla responsiva -----------------------------------------------------
// La grilla se escala con scale(0.675) + skew, asi que una cantidad fija de
// celdas cubre bien una pantalla "normal" (~1080p) pero deja huecos en
// monitores grandes / de mas resolucion. En vez de fijar 120x80, calculamos
// cuantas celdas hacen falta segun el viewport: mantenemos el minimo actual
// (que ya se ve bien) y crecemos en pantallas mas grandes, con un tope para
// no reventar el rendimiento en 4K/5K.
const REF_W = 1920 // viewport de referencia donde 120x80 ya llena bien
const REF_H = 1080
const MIN_H = 120 // baseline actual: nunca bajamos de aca
const MIN_V = 80
const MAX_H = 220 // techo de seguridad para el rendimiento
const MAX_V = 150

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

const getGridSize = () => {
  // SSR / primer render sin window: usamos el baseline.
  if (typeof window === 'undefined') return { h: MIN_H, v: MIN_V }
  const w = window.innerWidth
  const hpx = window.innerHeight
  return {
    h: clamp(Math.ceil((MIN_H * w) / REF_W), MIN_H, MAX_H),
    v: clamp(Math.ceil((MIN_V * hpx) / REF_H), MIN_V, MAX_V),
  }
}

// Nos suscribimos a resize una sola vez para toda la app (via
// useSyncExternalStore) y solo re-renderizamos si cambia la cantidad de celdas.
let cachedSize = getGridSize()
const subscribe = (onChange: () => void) => {
  const handler = () => {
    const next = getGridSize()
    if (next.h !== cachedSize.h || next.v !== cachedSize.v) {
      cachedSize = next
      onChange()
    }
  }
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}
const getSnapshot = () => cachedSize
const getServerSnapshot = () => ({ h: MIN_H, v: MIN_V })

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const { h, v } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
  const rows = useMemo(() => new Array(h).fill(1), [h])
  const cols = useMemo(() => new Array(v).fill(1), [v])

  // Delegacion de eventos: 2 listeners para toda la grilla en lugar de uno
  // por celda. Al entrar pinta la celda (instantaneo); al salir, transicion
  // CSS de 2s que la devuelve a transparente.
  const handleOver = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const cell = e.target as HTMLElement
    if (!cell.dataset.cell) return
    cell.style.transition = 'background-color 0s'
    cell.style.backgroundColor = randomColor()
  }, [])

  const handleOut = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const cell = e.target as HTMLElement
    if (!cell.dataset.cell) return
    cell.style.transition = 'background-color 2s'
    cell.style.backgroundColor = 'transparent'
  }, [])

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      className={cn(
        'absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4',
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          className="relative h-8 w-16 border-l border-slate-300"
        >
          {cols.map((_, j) => (
            <div
              key={`col` + j}
              data-cell="1"
              className="relative h-8 w-16 border-t border-r border-slate-300"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const Boxes = React.memo(BoxesCore)
