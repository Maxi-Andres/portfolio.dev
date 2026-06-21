/**
 * ============================================================
 *  CarGame (componente visible: canvas + overlays)
 * ============================================================
 *
 * Toda la logica esta en `useCarGame` / `engine`. Aca solo armamos
 * la UI: el canvas pixel art, el boton de play y el game over.
 * El juego se acelera y mete mas autos solo con el tiempo.
 */
import { type PointerEvent } from 'react'
import { IconPlayerPlayFilled, IconRotateClockwise } from '@tabler/icons-react'
import { GAME_CONFIG } from './config'
import { useCarGame } from './useCarGame'

const CarGame = () => {
  const { canvasRef, status, score, best, start, handlePointer, clearPointer } =
    useCarGame()

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (status !== 'playing') return
    e.currentTarget.setPointerCapture(e.pointerId)
    handlePointer(e.clientX)
  }
  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (status !== 'playing' || e.buttons === 0) return
    handlePointer(e.clientX)
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ maxWidth: 380 }}
    >
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.view.width}
        height={GAME_CONFIG.view.height}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={clearPointer}
        onPointerLeave={clearPointer}
        className="block h-auto w-full select-none"
        style={{
          imageRendering: 'pixelated',
          touchAction: 'none',
          aspectRatio: `${GAME_CONFIG.view.width} / ${GAME_CONFIG.view.height}`,
          backgroundColor: GAME_CONFIG.road.grassOuter,
        }}
      />

      {/* Score arriba a la izquierda mientras jugas */}
      {status === 'playing' && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-black/45 px-3 py-1 font-mono text-sm text-white backdrop-blur-sm">
          {score.toLocaleString()}
        </div>
      )}

      {/* Overlay inicial: boton de play (como la captura) */}
      {status === 'idle' && (
        <Overlay>
          <button
            onClick={start}
            aria-label="Play"
            className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/85 text-black transition-transform duration-200 hover:scale-105"
          >
            <IconPlayerPlayFilled size={36} className="ml-1" />
          </button>
          <p className="mt-4 text-sm text-white/80">
            Flechas / A-D o arrastra para esquivar
          </p>
        </Overlay>
      )}

      {/* Overlay de game over */}
      {status === 'gameover' && (
        <Overlay>
          <p className="text-2xl font-semibold text-white">Game Over</p>
          <p className="mt-1 font-mono text-white/80">
            {score.toLocaleString()} pts
          </p>
          <p className="mb-4 mt-1 text-xs text-white/55">
            Best {best.toLocaleString()}
          </p>
          <button
            onClick={start}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white/85 px-5 py-2 font-medium text-black transition-transform duration-200 hover:scale-105"
          >
            <IconRotateClockwise size={18} />
            Play again
          </button>
        </Overlay>
      )}
    </div>
  )
}

/** Capa oscura centrada reutilizable para los estados idle / gameover. */
const Overlay = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px]">
    {children}
  </div>
)

export default CarGame
