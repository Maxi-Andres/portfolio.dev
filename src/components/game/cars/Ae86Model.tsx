import { useEffect, useMemo } from 'react'
import { CanvasTexture } from 'three'
import type { CarModel } from './index'

const WHITE = '#eef0f1'
const BLACK = '#1b1b1b'
const GLASS = '#222a2f'
const TIRE = '#161616'
const HUB = '#34373a'
const HEAD = '#e6ebee'
const SIGNAL = '#e2902f'
const TAIL = '#d43329'

const WHEEL_RADIUS = 0.33

// Decal "藤原とうふ店" (Fujiwara Tofu Shop) generado en un canvas
const useTofuDecal = () => {
  const tex = useMemo(() => {
    if (typeof document === 'undefined') return null
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 128
    const ctx = c.getContext('2d')
    if (!ctx) return null
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.fillStyle = '#171717'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font =
      'bold 44px "Yu Gothic", "Hiragino Kaku Gothic Pro", "Meiryo", "MS Gothic", sans-serif'
    ctx.fillText('藤原とうふ店', c.width / 2, 52)
    ctx.font = '22px "Yu Gothic", "Meiryo", sans-serif'
    ctx.fillText('（自家用）', c.width / 2, 96)
    const t = new CanvasTexture(c)
    t.anisotropy = 4
    return t
  }, [])
  useEffect(() => () => tex?.dispose(), [tex])
  return tex
}

const Body = () => {
  const decal = useTofuDecal()
  const W = 1.52 // ancho del cuerpo
  return (
    <group>
      {/* cuerpo principal (blanco), bajo y largo */}
      <mesh position-y={0.46} castShadow>
        <boxGeometry args={[3.75, 0.4, W]} />
        <meshStandardMaterial color={WHITE} />
      </mesh>
      {/* guardabarros / hombros un poco más anchos */}
      <mesh position-y={0.4} castShadow>
        <boxGeometry args={[3.6, 0.26, W + 0.12]} />
        <meshStandardMaterial color={WHITE} />
      </mesh>
      {/* stripe negro inferior (two-tone) */}
      <mesh position-y={0.27}>
        <boxGeometry args={[3.66, 0.14, W + 0.14]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>

      {/* capó negro largo y bajo (panda) */}
      <mesh position={[1.18, 0.67, 0]} castShadow>
        <boxGeometry args={[1.5, 0.06, W - 0.06]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>

      {/* parabrisas rakeado */}
      <mesh position={[0.36, 0.82, 0]} rotation-z={0.72}>
        <boxGeometry args={[0.5, 0.05, W - 0.16]} />
        <meshStandardMaterial color={GLASS} />
      </mesh>
      {/* greenhouse: pilares blancos */}
      <mesh position={[-0.42, 0.86, 0]} castShadow>
        <boxGeometry args={[1.42, 0.36, W - 0.04]} />
        <meshStandardMaterial color={WHITE} />
      </mesh>
      {/* ventanas laterales (banda oscura) */}
      <mesh position={[-0.42, 0.88, 0]}>
        <boxGeometry args={[1.26, 0.26, W + 0.02]} />
        <meshStandardMaterial color={GLASS} />
      </mesh>
      {/* techo blanco bajo */}
      <mesh position={[-0.5, 1.04, 0]} castShadow>
        <boxGeometry args={[1.04, 0.06, W - 0.08]} />
        <meshStandardMaterial color={WHITE} />
      </mesh>
      {/* luneta/portón trasero rakeado (liftback) */}
      <mesh position={[-1.28, 0.84, 0]} rotation-z={-0.74}>
        <boxGeometry args={[0.62, 0.05, W - 0.12]} />
        <meshStandardMaterial color={GLASS} />
      </mesh>
      {/* alerón trasero */}
      <mesh position={[-1.72, 0.72, 0]} castShadow>
        <boxGeometry args={[0.12, 0.05, W - 0.2]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>

      {/* paragolpes negros */}
      {[1.88, -1.9].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} castShadow>
          <boxGeometry args={[0.14, 0.28, W - 0.04]} />
          <meshStandardMaterial color={BLACK} />
        </mesh>
      ))}

      {/* faros (pop-ups cerrados) */}
      {[0.48, -0.48].map((z) => (
        <mesh key={z} position={[1.82, 0.54, z]}>
          <boxGeometry args={[0.08, 0.14, 0.34]} />
          <meshStandardMaterial color={HEAD} emissive={HEAD} emissiveIntensity={0.25} />
        </mesh>
      ))}
      {/* intermitentes naranjas */}
      {[0.62, -0.62].map((z) => (
        <mesh key={z} position={[1.86, 0.4, z]}>
          <boxGeometry args={[0.07, 0.1, 0.16]} />
          <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* parrilla negra */}
      <mesh position={[1.86, 0.52, 0]}>
        <boxGeometry args={[0.05, 0.1, 0.95]} />
        <meshStandardMaterial color={BLACK} />
      </mesh>
      {/* luces traseras (anchas) */}
      {[0.5, -0.5].map((z) => (
        <mesh key={z} position={[-1.88, 0.52, z]}>
          <boxGeometry args={[0.05, 0.16, 0.44]} />
          <meshStandardMaterial color={TAIL} emissive={TAIL} emissiveIntensity={0.6} />
        </mesh>
      ))}
      {/* espejos */}
      {[0.82, -0.82].map((z) => (
        <mesh key={z} position={[0.2, 0.78, z]}>
          <boxGeometry args={[0.14, 0.08, 0.1]} />
          <meshStandardMaterial color={BLACK} />
        </mesh>
      ))}

      {/* decal en las puertas */}
      {decal &&
        [
          { z: W / 2 + 0.01, ry: 0 },
          { z: -(W / 2 + 0.01), ry: Math.PI },
        ].map((d) => (
          <mesh key={d.z} position={[-0.05, 0.5, d.z]} rotation-y={d.ry}>
            <planeGeometry args={[1.25, 0.55]} />
            <meshBasicMaterial
              map={decal}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
    </group>
  )
}

const Wheel = () => (
  <>
    <mesh rotation-x={Math.PI / 2} castShadow>
      <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.22, 16]} />
      <meshStandardMaterial color={TIRE} flatShading />
    </mesh>
    {/* llanta negra */}
    <mesh rotation-x={Math.PI / 2}>
      <cylinderGeometry args={[WHEEL_RADIUS * 0.62, WHEEL_RADIUS * 0.62, 0.24, 8]} />
      <meshStandardMaterial color={HUB} flatShading />
    </mesh>
    {/* spokes simples */}
    {[0, 1, 2].map((i) => (
      <mesh key={i} rotation-z={(i * Math.PI) / 3} position-z={0}>
        <boxGeometry args={[WHEEL_RADIUS * 1.15, 0.07, 0.25]} />
        <meshStandardMaterial color={HUB} flatShading />
      </mesh>
    ))}
  </>
)

const Ae86Model: CarModel = {
  id: 'ae86',
  label: 'Toyota AE86',
  wheelRadius: WHEEL_RADIUS,
  wheels: [
    { x: 1.2, z: 0.78, front: true },
    { x: 1.2, z: -0.78, front: true },
    { x: -1.2, z: 0.78, front: false },
    { x: -1.2, z: -0.78, front: false },
  ],
  Body,
  Wheel,
}

export default Ae86Model
