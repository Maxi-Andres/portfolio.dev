/**
 * ============================================================
 *  CarGame (cabinet arcade plegable)
 * ============================================================
 *
 * Arranca PLEGADO. El cuerpo del juego (`GameBody`) se carga de forma
 * diferida (React.lazy) y solo se monta cuando lo abris -> mientras
 * esta plegado no descarga ni ejecuta nada del juego, asi no afecta el
 * rendimiento de la pagina. El estado plegado/desplegado se guarda en
 * localStorage.
 */
import { lazy, Suspense, useEffect, useState } from 'react'
import {
  IconChevronUp,
  IconChevronDown,
  IconDeviceGamepad2,
} from '@tabler/icons-react'
import { GAME_CONFIG } from './config'

const GameBody = lazy(() => import('./GameBody'))

const TITLE = 'DODGE RACER'
const fmt = (n: number) => n.toLocaleString('en-US')

const CarGame = () => {
  // Por defecto plegado (a menos que el usuario lo haya dejado abierto).
  const [collapsed, setCollapsed] = useState(() => {
    const v = localStorage.getItem(GAME_CONFIG.collapseKey)
    return v === null ? true : v === '1'
  })
  useEffect(() => {
    localStorage.setItem(GAME_CONFIG.collapseKey, collapsed ? '1' : '0')
  }, [collapsed])

  const [best, setBest] = useState(
    () => Number(localStorage.getItem(GAME_CONFIG.bestScoreKey)) || 0
  )

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
          <span className="font-pixel app-text-muted text-[9px]">
            HI <span className="text-[#ffd84a]">{fmt(best)}</span>
          </span>
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Open game' : 'Collapse game'}
            className="border-app border-hover-app bg-techitem-hover app-text-body flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-2.5"
          >
            <span className="font-pixel text-[8px]">
              {collapsed ? 'PLAY' : 'HIDE'}
            </span>
            {collapsed ? (
              <IconChevronDown size={16} />
            ) : (
              <IconChevronUp size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Cuerpo: se carga/monta SOLO al desplegar */}
      {!collapsed && (
        <Suspense
          fallback={
            <div className="font-pixel app-text-faint mt-4 py-10 text-center text-[9px]">
              LOADING…
            </div>
          }
        >
          <GameBody onBest={setBest} />
        </Suspense>
      )}
    </div>
  )
}

export default CarGame
