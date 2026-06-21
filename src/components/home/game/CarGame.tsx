/**
 * ============================================================
 *  CarGame (cabinet arcade: paneles + canvas + leaderboard)
 * ============================================================
 *
 * Layout estilo "fichin": a los costados del juego van el titulo,
 * los controles, el SCORE / HI-SCORE y el leaderboard. Todo el
 * cabinet se puede PLEGAR (collapse) para no romper el estilo de la
 * pagina. Los paneles usan los tokens de diseño del sitio (border-app,
 * bg-techitem) y la fuente pixel solo para los textos arcade.
 *
 * La logica del juego vive en `useCarGame` / `engine`.
 */
import { useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import {
  IconPlayerPlayFilled,
  IconRotateClockwise,
  IconChevronUp,
  IconChevronDown,
  IconDeviceGamepad2,
  IconTrophy,
} from '@tabler/icons-react'
import { GAME_CONFIG } from './config'
import { useCarGame } from './useCarGame'

const TITLE = 'DODGE RACER'
const fmt = (n: number) => n.toLocaleString('en-US')

const CarGame = () => {
  const game = useCarGame()
  const { status, score, best, scores } = game

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(GAME_CONFIG.collapseKey) === '1'
  )
  useEffect(() => {
    localStorage.setItem(GAME_CONFIG.collapseKey, collapsed ? '1' : '0')
  }, [collapsed])

  return (
    <div className="w-full">
      {/* Barra superior: marca arcade + HI + plegar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#ffd84a]">
          <IconDeviceGamepad2 size={20} />
          <span
            className="font-pixel text-[11px] sm:text-sm"
            style={{ textShadow: '2px 2px 0 #cf3a33' }}
          >
            {TITLE}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[9px] text-neutral-400">
            HI <span className="text-[#ffd84a]">{fmt(best)}</span>
          </span>
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expandir juego' : 'Plegar juego'}
            className="border-app border-hover-app bg-techitem-hover flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-300"
          >
            {collapsed ? (
              <IconChevronDown size={18} />
            ) : (
              <IconChevronUp size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Cuerpo plegable */}
      {!collapsed && (
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <SidePanel className="lg:w-40">
            <PanelTitle>
              <IconDeviceGamepad2 size={14} /> CONTROLS
            </PanelTitle>
            <ul className="font-pixel mt-3 space-y-2 text-[8px] leading-relaxed text-neutral-300">
              <li>← → MOVER</li>
              <li>A · D MOVER</li>
              <li>ARRASTRA EN PANTALLA</li>
            </ul>
            <p className="font-pixel mt-4 text-[7px] leading-relaxed text-neutral-500">
              ESQUIVA EL TRAFICO Y SUMA PUNTOS. CADA VEZ MAS RAPIDO.
            </p>
          </SidePanel>

          {/* Canvas central */}
          <div className="flex min-w-0 flex-1 justify-center">
            <Stage game={game} />
          </div>

          {/* Panel derecho: marcador + leaderboard */}
          <SidePanel className="lg:w-56">
            <div className="grid grid-cols-2 gap-2">
              <Stat label="SCORE" value={fmt(status === 'playing' ? score : 0)} />
              <Stat label="HI-SCORE" value={fmt(best)} accent />
            </div>
            <PanelTitle className="mt-4">
              <IconTrophy size={14} /> LEADERBOARD
            </PanelTitle>
            <Leaderboard
              scores={scores}
              highlight={status === 'gameover' ? score : -1}
            />
          </SidePanel>
        </div>
      )}
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

      {status === 'playing' && (
        <div className="font-pixel pointer-events-none absolute left-2 top-2 rounded-md border-2 border-white/20 bg-black/65 px-2.5 py-1.5 text-[9px] text-white">
          <span className="text-white/60">SCORE</span> {fmt(score)}
        </div>
      )}

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

const Leaderboard = ({
  scores,
  highlight,
}: {
  scores: number[]
  highlight: number
}) => {
  const rows = Array.from({ length: GAME_CONFIG.leaderboardSize }, (_, i) => ({
    rank: i + 1,
    value: scores[i],
  }))
  let used = false // resalta solo la primera coincidencia del ultimo score
  return (
    <ol className="font-pixel mt-3 space-y-1.5 text-[9px]">
      {rows.map(({ rank, value }) => {
        const isNew = !used && value != null && value === highlight
        if (isNew) used = true
        return (
          <li
            key={rank}
            className={`flex items-center justify-between rounded px-1.5 py-1 ${
              isNew ? 'bg-[#ffd84a]/15 text-[#ffd84a]' : 'text-neutral-300'
            }`}
          >
            <span className="text-neutral-500">#{rank}</span>
            <span>{value != null ? fmt(value) : '---'}</span>
          </li>
        )
      })}
    </ol>
  )
}

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

export default CarGame
