'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  twinkleSpeed: number | null
  phase: number
}

interface StarBackgroundProps {
  starDensity?: number
  allStarsTwinkle?: boolean
  twinkleProbability?: number
  minTwinkleSpeed?: number
  maxTwinkleSpeed?: number
  className?: string
}

const FPS = 40 // el titileo es lento, no necesita 60fps

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // las estrellas viven en un ref (NO en estado) para no re-renderizar React
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const generate = (w: number, h: number) => {
      const n = Math.floor(w * h * starDensity)
      const arr: Star[] = new Array(n)
      for (let i = 0; i < n; i++) {
        const twinkle = allStarsTwinkle || Math.random() < twinkleProbability
        arr[i] = {
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 0.6 + 0.6,
          twinkleSpeed: twinkle
            ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          phase: Math.random() * Math.PI * 2,
        }
      }
      starsRef.current = arr
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      generate(width, height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const frame = 1000 / FPS
    let last = 0
    let raf = 0
    const render = (now: number) => {
      raf = requestAnimationFrame(render)
      if (now - last < frame) return
      last = now
      const t = now * 0.001 // tiempo una sola vez por frame
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // fillRect (barato) en vez de arc (caro)
        if (s.twinkleSpeed !== null) {
          const a = 0.5 + 0.5 * Math.abs(Math.sin(t / s.twinkleSpeed + s.phase))
          ctx.fillStyle = `rgba(255,255,255,${a})`
        } else {
          ctx.fillStyle = 'rgba(255,255,255,0.85)'
        }
        ctx.fillRect(s.x, s.y, s.size, s.size)
      }
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 h-full w-full', className)}
    />
  )
}
