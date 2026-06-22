'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'

interface ShootingStarsProps {
  minSpeed?: number
  maxSpeed?: number
  minDelay?: number
  maxDelay?: number
  starColor?: string
  trailColor?: string
  starWidth?: number
  starHeight?: number
  className?: string
}

interface Star {
  x: number
  y: number
  angle: number
  speed: number
  distance: number
  scale: number
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4)
  const offset = Math.random() * window.innerWidth

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 }
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 }
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 }
    case 3:
      return { x: 0, y: offset, angle: 315 }
    default:
      return { x: 0, y: 0, angle: 45 }
  }
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = '#9E00FF',
  trailColor = '#2EB9DF',
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // una estrella activa por vez, en un ref (sin estado de React por frame)
  const starRef = useRef<Star | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // spawn por timer (igual que antes): una estrella, esperar, otra
    let timeoutId: number | undefined
    const spawn = () => {
      const { x, y, angle } = getRandomStartPoint()
      starRef.current = {
        x,
        y,
        angle,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
        scale: 1,
      }
      const delay = Math.random() * (maxDelay - minDelay) + minDelay
      timeoutId = window.setTimeout(spawn, delay)
    }
    spawn()

    let raf = 0
    const render = () => {
      raf = requestAnimationFrame(render)
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const s = starRef.current
      if (!s) return

      const rad = (s.angle * Math.PI) / 180
      s.x += s.speed * Math.cos(rad)
      s.y += s.speed * Math.sin(rad)
      s.distance += s.speed
      s.scale = 1 + s.distance / 100

      if (s.x < -20 || s.x > w + 20 || s.y < -20 || s.y > h + 20) {
        starRef.current = null
        return
      }

      const len = starWidth * s.scale
      ctx.save()
      ctx.translate(s.x, s.y)
      ctx.rotate(rad)
      const grad = ctx.createLinearGradient(0, 0, len, 0)
      grad.addColorStop(0, trailColor + '00') // trail transparente
      grad.addColorStop(1, starColor) // cabeza opaca
      ctx.fillStyle = grad
      ctx.fillRect(0, -starHeight / 2, len, starHeight)
      ctx.restore()
    }
    raf = requestAnimationFrame(render)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [
    minSpeed,
    maxSpeed,
    minDelay,
    maxDelay,
    starColor,
    trailColor,
    starWidth,
    starHeight,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none fixed inset-0 z-0 h-full w-full',
        className
      )}
    />
  )
}
