/**
 * ============================================================
 *  GameBody (cuerpo del cabinet: paneles + canvas + leaderboard)
 * ============================================================
 *
 * Se carga de forma diferida (React.lazy) y SOLO se monta cuando el
 * cabinet esta desplegado -> mientras esta plegado no corre nada del
 * juego (ni canvas, ni loop) y no pesa en el rendimiento de la pagina.
 *
 * El leaderboard es fijo (hardcodeado) con nombres iconicos. El record
 * personal del jugador (best) se muestra aparte y se avisa al header
 * via `onBest`.
 */
import { useEffect, type PointerEvent, type ReactNode } from 'react'
import {
  IconPlayerPlayFilled,
  IconRotateClockwise,
  IconDeviceGamepad2,
  IconTrophy,
} from '@tabler/icons-react'
import { GAME_CONFIG } from './config'
import { useCarGame } from './useCarGame'

const fmt = (n: number) => n.toLocaleString('en-US')

/** Leaderboard fijo, nombres iconicos. El #1 tiene 666,666 :) */
const LEADERBOARD: { name: string; score: number }[] = [
  { name: 'SPEED RACER', score: 666666 },
  { name: 'L. MCQUEEN', score: 420690 },
  { name: 'THE STIG', score: 395095 },
  { name: 'D. TORETTO', score: 299792 },
  { name: 'KEN MILES', score: 251000 },
  { name: 'M. KNIGHT', score: 199999 },
]

export default function GameBody({
  onBest,
}: {
  onBest: (best: number) => void
}) {
  const game = useCarGame()
  const { status, score, best } = game

  // Avisa al header el record personal actual.
  useEffect(() => onBest(best), [best, onBest])

  return (
    <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Panel izquierdo: controles */}
      <SidePanel className="lg:w-40">
        <PanelTitle>
          <IconDeviceGamepad2 size={14} /> CONTROLS
        </PanelTitle>
        <ul className="font-pixel mt-3 space-y-2 text-[8px] leading-relaxed text-neutral-300">
          <li>&larr; &rarr; MOVE</li>
          <li>A &middot; D MOVE</li>
          <li>DRAG ON SCREEN</li>
        </ul>
        <p className="font-pixel mt-4 text-[7px] leading-relaxed text-neutral-500">
          DODGE THE TRAFFIC AND RACK UP POINTS. IT KEEPS GETTING FASTER.
        </p>
      </SidePanel>

      {/* Canvas central */}
      <div className="flex min-w-0 flex-1 justify-center">
        <Stage game={game} />
      </div>

      {/* Panel derecho: marcador + leaderboard */}
      <SidePanel className="lg:w-64">
        <div className="grid grid-cols-2 gap-2">
          <Stat label="SCORE" value={fmt(status === 'playing' ? score : 0)} />
          <Stat label="YOUR BEST" value={fmt(best)} accent />
        </div>
        <PanelTitle className="mt-4">
          <IconTrophy size={14} /> LEADERBOARD
        </PanelTitle>
        <ol className="font-pixel mt-3 space-y-1.5 text-[9px]">
          {LEADERBOARD.map((row, i) => (
            <li
              key={row.name}
              className={`flex items-center justify-between gap-2 rounded px-1.5 py-1 ${
                i === 0 ? 'text-[#ffd84a]' : 'text-neutral-300'
              }`}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="text-neutral-500">#{i + 1}</span>
                <span className="truncate">{row.name}</span>
              </span>
              <span className="shrink-0">{fmt(row.score)}</span>
            </li>
          ))}
        </ol>
      </SidePanel>
    </div>
  )
}

/* ---------------- Canvas + overlays ---------------- */

const Stage = ({ game }: { game: ReturnType<typeof useCarGame> }) => {
  const { canvasRef, status, score, best, start, handlePointer, clearPointer } =
    game

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

      {status === 'idle' && (
        <Overlay>
          <RetroButton onClick={start}>
            <IconPlayerPlayFilled size={14} className="mr-1 inline" /> PLAY
          </RetroButton>
          <p className="font-pixel mt-4 text-[7px] leading-relaxed text-white/55">
            PRESS START
          </p>
        </Overlay>
      )}

      {status === 'gameover' && (
        <Overlay>
          <p
            className="font-pixel text-xl text-[#e8443a] sm:text-2xl"
            style={{ textShadow: '3px 3px 0 #000' }}
          >
            GAME OVER
          </p>
          <p className="font-pixel mt-4 text-[10px] text-white">
            SCORE {fmt(score)}
          </p>
          {score > 0 && score >= best && (
            <p className="font-pixel mt-2 text-[9px] text-[#ffd84a]">
              ★ NEW BEST ★
            </p>
          )}
          <RetroButton onClick={start} className="mt-5">
            <IconRotateClockwise size={14} className="mr-1 inline" /> PLAY AGAIN
          </RetroButton>
        </Overlay>
      )}
    </div>
  )
}

/* ---------------- piezas de UI ---------------- */

const SidePanel = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`border-app bg-techitem shrink-0 rounded-xl p-4 ${className}`}
  >
    {children}
  </div>
)

const PanelTitle = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`font-pixel flex items-center gap-1.5 text-[9px] text-neutral-400 ${className}`}
  >
    {children}
  </div>
)

const Stat = ({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) => (
  <div className="border-app rounded-lg bg-black/25 px-2 py-2">
    <p className="font-pixel text-[7px] text-neutral-500">{label}</p>
    <p
      className={`font-pixel mt-1 text-[11px] ${accent ? 'text-[#ffd84a]' : 'text-white'}`}
    >
      {value}
    </p>
  </div>
)

const Overlay = ({ children }: { children: ReactNode }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-4 text-center backdrop-blur-[1px]">
    {children}
  </div>
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
    className={`font-pixel cursor-pointer border-b-4 border-[#2a7a2a] bg-[#3fae3f] px-5 py-3 text-[11px] text-white transition-all duration-150 hover:bg-[#48c248] active:translate-y-0.5 active:border-b-2 ${className}`}
    style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.4)' }}
  >
    {children}
  </button>
)
