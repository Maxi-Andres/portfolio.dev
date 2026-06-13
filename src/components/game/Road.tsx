import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Euler,
  Matrix4,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from 'three'
import {
  CENTERLINE,
  N,
  NORMALS,
  PALETTE,
  RAIL_LEFT,
  RAIL_RIGHT,
  ROAD_HALF,
  START,
  TANGENTS,
  type RailPost,
} from './trackData'

const ROAD_Y = 0.04

// Cinta de asfalto a partir del centerline + normales
const useRoadGeometry = () =>
  useMemo(() => {
    const pos = new Float32Array(N * 2 * 3)
    for (let i = 0; i < N; i++) {
      const p = CENTERLINE[i]
      const nrm = NORMALS[i]
      const lx = p.x + nrm.x * ROAD_HALF
      const lz = p.z + nrm.z * ROAD_HALF
      const rx = p.x - nrm.x * ROAD_HALF
      const rz = p.z - nrm.z * ROAD_HALF
      pos.set([lx, ROAD_Y, lz], i * 6)
      pos.set([rx, ROAD_Y, rz], i * 6 + 3)
    }
    const idx: number[] = []
    for (let i = 0; i < N; i++) {
      const a = i * 2 // left_i
      const b = i * 2 + 1 // right_i
      const c = ((i + 1) % N) * 2 // left_{i+1}
      const d = ((i + 1) % N) * 2 + 1 // right_{i+1}
      idx.push(a, b, c, b, d, c)
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(pos, 3))
    geo.setIndex(idx)
    geo.computeVertexNormals()
    return geo
  }, [])

const RailSide = ({ pts }: { pts: RailPost[] }) => {
  const postRef = useRef<InstancedMesh>(null)
  const beamRef = useRef<InstancedMesh>(null)
  const n = pts.length

  useLayoutEffect(() => {
    const posts = postRef.current
    const beams = beamRef.current
    if (!posts || !beams) return
    const m = new Matrix4()
    const p = new Vector3()
    const q = new Quaternion()
    const e = new Euler()
    const s = new Vector3()
    const noRot = new Quaternion()
    const one = new Vector3(1, 1, 1)

    for (let i = 0; i < n; i++) {
      m.compose(p.set(pts[i].x, 0.35, pts[i].z), noRot, one)
      posts.setMatrixAt(i, m)

      const a = pts[i]
      const b = pts[(i + 1) % n]
      const dx = b.x - a.x
      const dz = b.z - a.z
      const len = Math.hypot(dx, dz)
      q.setFromEuler(e.set(0, Math.atan2(-dz, dx), 0))
      m.compose(
        p.set((a.x + b.x) / 2, 0.55, (a.z + b.z) / 2),
        q,
        s.set(len, 1, 1),
      )
      beams.setMatrixAt(i, m)
    }
    posts.instanceMatrix.needsUpdate = true
    beams.instanceMatrix.needsUpdate = true
  }, [n, pts])

  return (
    <group>
      <instancedMesh
        ref={postRef}
        args={[undefined, undefined, n]}
        castShadow
        frustumCulled={false}
      >
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshStandardMaterial color={PALETTE.railPost} flatShading />
      </instancedMesh>
      <instancedMesh
        ref={beamRef}
        args={[undefined, undefined, n]}
        castShadow
        frustumCulled={false}
      >
        <boxGeometry args={[1, 0.12, 0.06]} />
        <meshStandardMaterial color={PALETTE.rail} flatShading />
      </instancedMesh>
    </group>
  )
}

// Líneas centrales discontinuas
const CenterLine = () => {
  const dashes = useMemo(() => {
    const out: { x: number; z: number; rot: number }[] = []
    for (let i = 0; i < N; i += 6) {
      const p = CENTERLINE[i]
      const t = TANGENTS[i]
      out.push({ x: p.x, z: p.z, rot: Math.atan2(-t.z, t.x) })
    }
    return out
  }, [])
  return (
    <group>
      {dashes.map((d, i) => (
        <mesh
          key={i}
          position={[d.x, ROAD_Y + 0.02, d.z]}
          rotation={[-Math.PI / 2, 0, -d.rot]}
        >
          <planeGeometry args={[1.5, 0.18]} />
          <meshStandardMaterial color={PALETTE.roadLine} />
        </mesh>
      ))}
    </group>
  )
}

// Meta: franja a cuadros en el piso + pórtico
const StartLine = () => {
  const rot = Math.atan2(-START.fz, START.fx)
  // dirección "a lo ancho" de la ruta
  const nx = START.nx
  const nz = START.nz
  const checks = []
  const cols = 8
  for (let c = 0; c < cols; c++) {
    const off = (c - (cols - 1) / 2) * (ROAD_HALF * 2 / cols)
    checks.push({
      x: START.x + nx * off,
      z: START.z + nz * off,
      dark: c % 2 === 0,
    })
  }
  return (
    <group>
      {/* franja a cuadros */}
      {checks.map((ch, i) => (
        <mesh
          key={i}
          position={[ch.x, ROAD_Y + 0.03, ch.z]}
          rotation={[-Math.PI / 2, 0, -rot]}
        >
          <planeGeometry args={[1.1, (ROAD_HALF * 2) / cols + 0.02]} />
          <meshStandardMaterial color={ch.dark ? '#1c1c1c' : '#f2f2f2'} />
        </mesh>
      ))}
      {/* pórtico */}
      <group position={[START.x, 0, START.z]} rotation-y={rot}>
        {[-(ROAD_HALF + 0.6), ROAD_HALF + 0.6].map((z) => (
          <mesh key={z} position={[0, 1.6, z]} castShadow>
            <boxGeometry args={[0.2, 3.2, 0.2]} />
            <meshStandardMaterial color={PALETTE.signPost} flatShading />
          </mesh>
        ))}
        <mesh position={[0, 3.2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.5, (ROAD_HALF + 0.6) * 2]} />
          <meshStandardMaterial color={PALETTE.torii} flatShading />
        </mesh>
        <mesh position={[0.18, 3.2, 0]}>
          <boxGeometry args={[0.02, 0.34, (ROAD_HALF + 0.6) * 2 - 0.4]} />
          <meshStandardMaterial
            color="#f2f2f2"
            emissive="#ffffff"
            emissiveIntensity={0.15}
          />
        </mesh>
      </group>
    </group>
  )
}

const Road = () => {
  const geo = useRoadGeometry()
  // la geometría la construimos a mano, así que la liberamos a mano
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <group>
      <mesh geometry={geo} receiveShadow>
        <meshStandardMaterial color={PALETTE.road} roughness={0.95} />
      </mesh>
      <CenterLine />
      <RailSide pts={RAIL_LEFT} />
      <RailSide pts={RAIL_RIGHT} />
      <StartLine />
    </group>
  )
}

export default Road
