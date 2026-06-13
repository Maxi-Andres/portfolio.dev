import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import GlassCard from '../shared/GlassCard'
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconCar,
  IconPlayerPlayFilled,
  IconRefresh,
  IconX,
} from '@tabler/icons-react'
import { createControls, formatTime, type GameControls } from './trackData'
import { lapTiming, resetLapSession } from './lapStore'
import { CARS, DEFAULT_CAR_ID, getCar } from './cars'

// El canvas (three.js + escena) solo se carga cuando el usuario aprieta play
const GameScene = lazy(() => import('./GameScene'))

const HoldButton = ({
  onHold,
  label,
  children,
}: {
  onHold: (down: boolean) => void
  label: string
  children: ReactNode
}) => {
  // seguimos el pointer activo para que un segundo dedo no corte el control
  const activeId = useRef<number | null>(null)
  const release = (id: number) => {
    if (activeId.current === id) {
      activeId.current = null
      onHold(false)
    }
  }
  return (
    <button
      aria-label={label}
      className="border-app glass-effect pointer-events-auto flex h-16 w-16 touch-none items-center justify-center rounded-full text-white active:scale-95"
      onPointerDown={(e) => {
        e.preventDefault()
        if (activeId.current !== null) return
        activeId.current = e.pointerId
        e.currentTarget.setPointerCapture(e.pointerId)
        onHold(true)
      }}
      onPointerUp={(e) => release(e.pointerId)}
      onPointerCancel={(e) => release(e.pointerId)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  )
}

const LapHud = () => {
  const curRef = useRef<HTMLSpanElement>(null)
  const lastRef = useRef<HTMLSpanElement>(null)
  const bestRef = useRef<HTMLSpanElement>(null)
  const lapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const loop = () => {
      if (curRef.current)
        curRef.current.textContent =
          lapTiming.current > 0 ? formatTime(lapTiming.current) : '--.---'
      if (lastRef.current)
        lastRef.current.textContent = lapTiming.last
          ? formatTime(lapTiming.last)
          : '--.---'
      if (bestRef.current)
        bestRef.current.textContent = lapTiming.best
          ? formatTime(lapTiming.best)
          : '--.---'
      if (lapRef.current) lapRef.current.textContent = String(lapTiming.laps)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="pointer-events-none absolute top-3 left-3 select-none">
      <div className="glass-effect border-app rounded-xl px-4 py-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
            Lap
          </span>
          <span
            ref={curRef}
            className="font-mono text-2xl font-semibold text-white tabular-nums"
          >
            --.---
          </span>
        </div>
        <div className="mt-1 flex gap-4 font-mono text-xs text-neutral-300 tabular-nums">
          <span>
            <span className="text-neutral-500">best </span>
            <span ref={bestRef} className="text-emerald-300">
              --.---
            </span>
          </span>
          <span>
            <span className="text-neutral-500">last </span>
            <span ref={lastRef}>--.---</span>
          </span>
          <span>
            <span className="text-neutral-500">laps </span>
            <span ref={lapRef}>0</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const CarGame = () => {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)
  const [carId, setCarId] = useState(DEFAULT_CAR_ID)
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches,
  )
  const controlsRef = useRef<GameControls>(createControls())
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(true)

  const car = getCar(carId)

  const startGame = () => {
    resetLapSession()
    setPlaying(true)
  }

  const cycleCar = () => {
    const i = CARS.findIndex((c) => c.id === carId)
    setCarId(CARS[(i + 1) % CARS.length].id)
  }

  // Pausa el render loop cuando la card no está en pantalla
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    const controls = controlsRef.current

    const setKey = (code: string, down: boolean): boolean => {
      switch (code) {
        case 'KeyW':
        case 'ArrowUp':
          controls.forward = down
          return true
        case 'KeyS':
        case 'ArrowDown':
          controls.back = down
          return true
        case 'KeyA':
        case 'ArrowLeft':
          controls.left = down
          return true
        case 'KeyD':
        case 'ArrowRight':
          controls.right = down
          return true
        case 'KeyR':
          if (down) controls.resetCount += 1
          return true
        default:
          return false
      }
    }

    const releaseAll = () => {
      controls.forward = false
      controls.back = false
      controls.left = false
      controls.right = false
    }

    const onKeyDown = (e: KeyboardEvent) => {
      // no secuestrar atajos del navegador (Ctrl/Cmd/Alt + tecla)
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (!visibleRef.current) return
      if (e.code === 'KeyR' && e.repeat) return
      // las flechas solo dejan de scrollear mientras el juego está visible
      if (setKey(e.code, true) && e.code.startsWith('Arrow')) e.preventDefault()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      setKey(e.code, false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', releaseAll)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', releaseAll)
      releaseAll()
    }
  }, [playing])

  return (
    <GlassCard noPadding className="overflow-hidden md:col-span-2">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <IconCar stroke={1.5} />
          </span>
          <h3 className="text-xl font-semibold text-white">Touge Time Attack</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Switch car"
            onClick={cycleCar}
            className="border-app border-hover-app bg-techitem-hover flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-neutral-200 transition"
          >
            <IconCar size={15} stroke={1.5} />
            {car.label}
          </button>
          {playing && (
            <>
              <button
                title="Reset car (R)"
                onClick={() => {
                  controlsRef.current.resetCount += 1
                }}
                className="border-app border-hover-app bg-techitem-hover cursor-pointer rounded-full p-2 transition"
              >
                <IconRefresh size={18} stroke={1.5} />
              </button>
              <button
                title="Close game"
                onClick={() => setPlaying(false)}
                className="border-app border-hover-app bg-techitem-hover cursor-pointer rounded-full p-2 transition"
              >
                <IconX size={18} stroke={1.5} />
              </button>
            </>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[380px] w-full select-none md:h-[460px]"
      >
        {playing ? (
          <>
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                  <span className="animate-pulse">loading the mountain…</span>
                </div>
              }
            >
              <GameScene controls={controlsRef} car={car} paused={!visible} />
            </Suspense>

            <LapHud />

            {!isTouch && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-black/35 px-4 py-1.5 text-xs text-white/85 backdrop-blur-sm">
                  WASD / arrows to drive · R to reset
                </div>
              </div>
            )}

            {isTouch && (
              <>
                <div className="absolute bottom-4 left-4 flex gap-3">
                  <HoldButton
                    label="Steer left"
                    onHold={(v) => {
                      controlsRef.current.left = v
                    }}
                  >
                    <IconArrowLeft stroke={1.5} />
                  </HoldButton>
                  <HoldButton
                    label="Steer right"
                    onHold={(v) => {
                      controlsRef.current.right = v
                    }}
                  >
                    <IconArrowRight stroke={1.5} />
                  </HoldButton>
                </div>
                <div className="absolute right-4 bottom-4 flex gap-3">
                  <HoldButton
                    label="Reverse"
                    onHold={(v) => {
                      controlsRef.current.back = v
                    }}
                  >
                    <IconArrowDown stroke={1.5} />
                  </HoldButton>
                  <HoldButton
                    label="Accelerate"
                    onHold={(v) => {
                      controlsRef.current.forward = v
                    }}
                  >
                    <IconArrowUp stroke={1.5} />
                  </HoldButton>
                </div>
              </>
            )}
          </>
        ) : (
          <button
            onClick={startGame}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2f5132]/25 via-transparent to-[#aacbe0]/15"
          >
            <span className="border-app glass-effect flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
              <IconPlayerPlayFilled size={26} className="text-white" />
            </span>
            <span className="text-center">
              <span className="block font-semibold text-white">
                Hit the Japanese touge
              </span>
              <span className="mt-1 block text-sm text-neutral-400">
                a low-poly mountain pass built with Three.js — time your laps
                {isTouch ? ' · touch controls' : ' · WASD / arrows'}
              </span>
            </span>
          </button>
        )}
      </div>
    </GlassCard>
  )
}

export default CarGame
