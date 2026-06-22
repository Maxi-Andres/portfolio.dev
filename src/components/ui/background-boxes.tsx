'use client'
import React, { useCallback } from 'react'
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

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(120).fill(1)
  const cols = new Array(80).fill(1)

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
