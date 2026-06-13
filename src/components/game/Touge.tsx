import { useLayoutEffect, useRef } from 'react'
import {
  Color,
  Euler,
  Matrix4,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from 'three'
import {
  MOUNTAINS,
  PALETTE,
  ROCKS,
  TORII,
  TREES,
} from './trackData'

const Cedars = () => {
  const foliageRef = useRef<InstancedMesh>(null)
  const trunkRef = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const fol = foliageRef.current
    const trk = trunkRef.current
    if (!fol || !trk) return
    const m = new Matrix4()
    const p = new Vector3()
    const q = new Quaternion()
    const e = new Euler()
    const s = new Vector3()
    const c = new Color()
    const light = new Color(PALETTE.cedarLight)
    const dark = new Color(PALETTE.cedar)

    TREES.forEach((t, i) => {
      const h = 3.4 * t.s
      q.setFromEuler(e.set(0, t.s * 3.1, 0))
      m.compose(p.set(t.x, h / 2 + 0.3, t.z), q, s.set(t.s, t.s, t.s))
      fol.setMatrixAt(i, m)
      fol.setColorAt(i, c.copy(t.light ? light : dark))

      m.compose(p.set(t.x, 0.3 * t.s, t.z), q, s.set(t.s, t.s, t.s))
      trk.setMatrixAt(i, m)
    })
    fol.instanceMatrix.needsUpdate = true
    trk.instanceMatrix.needsUpdate = true
    if (fol.instanceColor) fol.instanceColor.needsUpdate = true
  }, [])

  return (
    <group>
      <instancedMesh
        ref={foliageRef}
        args={[undefined, undefined, TREES.length]}
        castShadow
        frustumCulled={false}
      >
        <coneGeometry args={[0.95, 3.4, 7]} />
        <meshStandardMaterial flatShading />
      </instancedMesh>
      <instancedMesh
        ref={trunkRef}
        args={[undefined, undefined, TREES.length]}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.14, 0.18, 0.7, 5]} />
        <meshStandardMaterial color={PALETTE.trunk} flatShading />
      </instancedMesh>
    </group>
  )
}

const Rocks = () => {
  const ref = useRef<InstancedMesh>(null)
  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const m = new Matrix4()
    const p = new Vector3()
    const q = new Quaternion()
    const e = new Euler()
    const s = new Vector3()
    const c = new Color()
    const a = new Color(PALETTE.rock)
    const b = new Color(PALETTE.rockDark)
    ROCKS.forEach((r, i) => {
      q.setFromEuler(e.set(r.rot * 0.3, r.rot, 0))
      m.compose(p.set(r.x, r.s * 0.3, r.z), q, s.set(r.s, r.s * 0.8, r.s))
      mesh.setMatrixAt(i, m)
      mesh.setColorAt(i, c.copy(i % 2 ? b : a))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, ROCKS.length]}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial flatShading />
    </instancedMesh>
  )
}

const Torii = () => (
  <group position={[TORII.x, 0, TORII.z]} rotation-y={TORII.rot}>
    {[-1.4, 1.4].map((z) => (
      <mesh key={z} position={[0, 2, z]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 4, 8]} />
        <meshStandardMaterial color={PALETTE.torii} flatShading />
      </mesh>
    ))}
    <mesh position={[0, 4.15, 0]} castShadow>
      <boxGeometry args={[0.5, 0.4, 4.4]} />
      <meshStandardMaterial color={PALETTE.toriiDark} flatShading />
    </mesh>
    <mesh position={[0, 3.7, 0]} castShadow>
      <boxGeometry args={[0.35, 0.28, 3.6]} />
      <meshStandardMaterial color={PALETTE.torii} flatShading />
    </mesh>
  </group>
)

const Mountains = () => (
  <group>
    {MOUNTAINS.map((m, i) => (
      <group key={i} position={[m.x, 0, m.z]} rotation-y={m.rot}>
        <mesh position-y={m.h / 2} castShadow receiveShadow>
          <coneGeometry args={[m.r, m.h, 7]} />
          <meshStandardMaterial
            color={i % 2 ? PALETTE.mountainDark : PALETTE.mountain}
            flatShading
          />
        </mesh>
        {m.snow && (
          <mesh position-y={m.h - m.h * 0.16}>
            <coneGeometry args={[m.r * 0.42, m.h * 0.34, 7]} />
            <meshStandardMaterial color={PALETTE.snow} flatShading />
          </mesh>
        )}
      </group>
    ))}
  </group>
)

const Touge = () => (
  <group>
    {/* suelo */}
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[140, 64]} />
      <meshStandardMaterial color={PALETTE.ground} />
    </mesh>
    {/* valle interior un poco más oscuro */}
    <mesh rotation-x={-Math.PI / 2} position-y={0.005}>
      <circleGeometry args={[46, 48]} />
      <meshStandardMaterial color={PALETTE.groundDark} transparent opacity={0.5} />
    </mesh>

    <Mountains />
    <Cedars />
    <Rocks />
    <Torii />
  </group>
)

export default Touge
