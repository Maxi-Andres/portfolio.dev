/**
 * ============================================================
 *  CarGame (componente visible: canvas + overlays pixel-art)
 * ============================================================
 *
 * Toda la logica esta en `useCarGame` / `engine`. Aca armamos la UI
 * estilo arcade: HUD de SCORE / HI-SCORE, pantalla de inicio y de
 * game over, todo con fuente pixel-art ("Press Start 2P").
 */
import { type PointerEvent, type ReactNode } from 'react'
import { GAME_CONFIG } from './config'
import { useCarGame } from './useCarGame'

const TITLE = 'DODGE RACER'

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

  const pad = (n: number) => n.toLocaleString('en-US')

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border-2 border-black/60"
      style={{ maxWidth: GAME_CONFIG.displayMaxWidth }}
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
          backgroundColor: GAME_CONFIG.scenery.grassBase,
        }}
      />

      {/* HUD durante el juego: SCORE (izq) e HI-SCORE (der) */}
      {status === 'playing' && (
        <>
          <HudTag className="left-2 top-2">
            <span className="text-white/60">SCORE</span> {pad(score)}
          </HudTag>
          <HudTag className="right-2 top-2">
            <span className="text-[#ffd84a]/80">HI</span>{' '}
            <span className="text-[#ffd84a]">{pad(best)}</span>
          </HudTag>
        </>
      )}

      {/* Pantalla de inicio */}
      {status === 'idle' && (
        <Overlay>
          <PixelTitle>{TITLE}</PixelTitle>
          <HiScore best={pad(best)} />
          <RetroButton onClick={start}>▶ PLAY</RetroButton>
          <p className="font-pixel mt-5 text-[7px] leading-relaxed text-white/55">
            ← → / A D &nbsp;·&nbsp; ARRASTRA PARA ESQUIVAR
          </p>
        </Overlay>
      )}

      {/* Game over */}
      {status === 'gameover' && (
        <Overlay>
          <p
            className="font-pixel text-xl text-[#e8443a] sm:text-2xl"
            style={{ textShadow: '3px 3px 0 #000' }}
          >
            GAME OVER
          </p>
          <p className="font-pixel mt-5 text-[10px] text-white">
            SCORE <span className="text-white">{pad(score)}</span>
          </p>
          <p className="font-pixel mt-2 text-[10px] text-[#ffd84a]">
            BEST {pad(best)}
          </p>
          <RetroButton onClick={start} className="mt-6">
            ↻ PLAY AGAIN
          </RetroButton>
        </Overlay>
      )}
    </div>
  )
}

/* ---------- piezas de UI pixel-art ---------- */

const Overlay = ({ children }: { children: ReactNode }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-4 text-center backdrop-blur-[1px]">
    {children}
  </div>
)

const HudTag = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`font-pixel pointer-events-none absolute rounded-md border-2 border-white/20 bg-black/65 px-2.5 py-1.5 text-[9px] text-white ${className}`}
  >
    {children}
  </div>
)

const PixelTitle = ({ children }: { children: ReactNode }) => (
  <h3
    className="font-pixel text-xl text-[#ffd84a] sm:text-3xl"
    style={{ textShadow: '3px 3px 0 #cf3a33, 5px 5px 0 #000' }}
  >
    {children}
  </h3>
)

const HiScore = ({ best }: { best: string }) => (
  <p className="font-pixel mt-4 text-[10px] text-[#ffd84a]">HI-SCORE {best}</p>
)

const RetroButton = ({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  className?: string
}) => (
  <button
    onClick={onClick}
    className={`font-pixel mt-6 cursor-pointer border-b-4 border-[#2a7a2a] bg-[#3fae3f] px-5 py-3 text-[11px] text-white transition-all duration-150 hover:bg-[#48c248] active:translate-y-0.5 active:border-b-2 ${className}`}
    style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}
  >
    {children}
  </button>
)

export default CarGame
