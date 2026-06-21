/**
 * ============================================================
 *  useCarGame (puente entre la logica del juego y React)
 * ============================================================
 *
 * - Mantiene el `World` en un ref (no re-renderiza por frame).
 * - Corre el loop con requestAnimationFrame.
 * - Expone a React solo lo que la UI necesita: status y score.
 * - Maneja input de teclado y de puntero (mouse / touch).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { GAME_CONFIG } from './config'
import { createPreviewWorld, createWorld, updateWorld } from './engine'
import { renderWorld } from './render'
import type { GameStatus, InputState, World } from './types'

export function useCarGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<World | null>(null)
  const inputRef = useRef<InputState>({ left: false, right: false, pointerX: null })
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const [status, setStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  // Record persistido en localStorage.
  const [best, setBest] = useState(() => {
    const saved = Number(localStorage.getItem(GAME_CONFIG.bestScoreKey))
    return Number.isFinite(saved) ? saved : 0
  })

  // ---- Loop principal ----
  // Named function expression: `frame` se referencia a si misma para el
  // requestAnimationFrame sin depender del `const` externo.
  const loop = useCallback(function frame(time: number) {
    const world = worldRef.current
    const canvas = canvasRef.current
    if (!world || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dt = Math.min(48, time - lastTimeRef.current) // clamp anti-saltos
    lastTimeRef.current = time

    const over = updateWorld(world, inputRef.current, dt)
    renderWorld(ctx, world)
    setScore(Math.floor(world.score))

    if (over) {
      const final = Math.floor(world.score)
      setScore(final)
      setBest((b) => {
        if (final <= b) return b
        localStorage.setItem(GAME_CONFIG.bestScoreKey, String(final))
        return final
      })
      setStatus('gameover')
      return
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [])

  const start = useCallback(() => {
    worldRef.current = createWorld()
    inputRef.current = { left: false, right: false, pointerX: null }
    lastTimeRef.current = performance.now()
    setScore(0)
    setStatus('playing')
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }, [loop])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  // Escena de muestra detras del boton de play (estados idle / gameover).
  useEffect(() => {
    if (status === 'playing') return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) renderWorld(ctx, createPreviewWorld())
  }, [status])

  // ---- Teclado ----
  useEffect(() => {
    const setKey = (e: KeyboardEvent, down: boolean) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          inputRef.current.left = down
          inputRef.current.pointerX = null
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          inputRef.current.right = down
          inputRef.current.pointerX = null
          break
        case ' ':
        case 'Enter':
          if (down && status !== 'playing') start()
          break
        default:
          return
      }
      if (status === 'playing') e.preventDefault()
    }
    const onDown = (e: KeyboardEvent) => setKey(e, true)
    const onUp = (e: KeyboardEvent) => setKey(e, false)
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [status, start])

  // ---- Puntero (mouse / touch sobre el canvas) ----
  const handlePointer = useCallback((clientX: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ratio = GAME_CONFIG.view.width / rect.width
    inputRef.current.pointerX = (clientX - rect.left) * ratio
  }, [])

  const clearPointer = useCallback(() => {
    inputRef.current.pointerX = null
  }, [])

  return {
    canvasRef,
    status,
    score,
    best,
    start,
    handlePointer,
    clearPointer,
  }
}
