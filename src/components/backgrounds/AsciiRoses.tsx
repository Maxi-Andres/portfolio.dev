import { useEffect, useRef } from 'react'
import rose1 from '../../../assets/Rose-main-771x1024.webp'
import rose2 from '../../../assets/7655a146674904d597902eee0f898520.jpg'
import rose3 from '../../../assets/images.jpg'
import rose4 from '../../../assets/images2.jpg'

/**
 * Fondo "Ascii Roses" — convierte fotos reales de rosas a ASCII de barras
 * verticales (tan sobre fondo oscuro), apiladas en los costados como en el
 * ejemplo de referencia.
 *
 * Clave: la intensidad de cada celda NO es el brillo sino la "rojez"
 * (cuanto domina el rojo sobre verde/azul). Asi los petalos rojos se
 * encienden y las hojas/fondo verdes quedan oscuros -> rosa limpia.
 *
 * Render estatico (solo se redibuja al cargar y al hacer resize): liviano.
 */

const SRCS = [rose4, rose1]

const BG = '#211c16' // marron casi negro (calido)
const TAN = '#c2ac82' // color de las barras
const CW = 4 // ancho de celda (px)
const CH = 7 // alto de celda (px)
const SIDE_RATIO = 0.38 // ancho de cada columna lateral (fraccion del viewport)
const THRESHOLD = 0.14 // por debajo de esto no se dibuja barra

// rojez del pixel: resalta petalos, apaga hojas/fondo verdes
const redness = (r: number, g: number, b: number) => {
  const v = (r - (g + b) / 2) / 255
  return v < 0 ? 0 : v > 1 ? 1 : v
}

const AsciiRoses = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // canvas auxiliar para muestrear cada rosa a baja resolucion
    const oc = document.createElement('canvas')
    const octx = oc.getContext('2d', { willReadFrequently: true })
    if (!octx) return

    const imgs: HTMLImageElement[] = []
    let disposed = false

    const drawRose = (
      img: HTMLImageElement,
      dx: number,
      dy: number,
      dw: number,
      dh: number,
      mirror: boolean
    ) => {
      const cols = Math.max(1, Math.floor(dw / CW))
      const rows = Math.max(1, Math.floor(dh / CH))
      oc.width = cols
      oc.height = rows
      octx.clearRect(0, 0, cols, rows)
      octx.drawImage(img, 0, 0, cols, rows)
      const px = octx.getImageData(0, 0, cols, rows).data
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const sx = mirror ? cols - 1 - cx : cx
          const i = (cy * cols + sx) * 4
          let v = redness(px[i], px[i + 1], px[i + 2])
          v = Math.pow(v, 0.75) * 1.3 // contraste / ganancia
          if (v > THRESHOLD) {
            if (v > 1) v = 1
            const barH = Math.max(1.5, v * CH)
            ctx.fillRect(dx + cx * CW, dy + cy * CH + (CH - barH), 2, barH)
          }
        }
      }
    }

    const draw = () => {
      const vw = (canvas.width = window.innerWidth)
      const vh = (canvas.height = window.innerHeight)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, vw, vh)
      if (imgs.length === 0) return

      ctx.fillStyle = TAN
      const sideW = Math.round(vw * SIDE_RATIO)
      const sides = [
        { x: 0, mirror: false, start: 0 },
        { x: vw - sideW, mirror: true, start: 1 },
      ]
      for (const side of sides) {
        let y = -Math.round(vh * 0.05)
        let k = side.start // desfasa para que los lados no sean identicos
        while (y < vh) {
          const img = imgs[k % imgs.length]
          const dh = Math.round(sideW * (img.naturalHeight / img.naturalWidth))
          drawRose(img, side.x, y, sideW, dh, side.mirror)
          y += Math.round(dh * 0.92) // leve solape -> mas lleno
          k++
        }
      }
    }

    let pending = SRCS.length
    SRCS.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        if (disposed) return
        imgs.push(img)
        pending--
        if (pending === 0) draw()
      }
      img.onerror = () => {
        pending--
        if (pending === 0) draw()
      }
      img.src = src
    })

    draw() // pinta el fondo oscuro mientras cargan
    window.addEventListener('resize', draw)

    return () => {
      disposed = true
      window.removeEventListener('resize', draw)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ background: BG }}
    />
  )
}

export default AsciiRoses
