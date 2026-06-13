import type { CarModel } from './index'

const RED = '#c63b2f'
const DARK = '#3c423a'
const HEAD = '#ffd166'
const TAIL = '#ff5340'
const GLASS = '#1d2521'
const TIRE = '#2e2b28'
const HUB = '#55504a'

const WHEEL_RADIUS = 0.34

const Body = () => (
  <group>
    {/* chassis */}
    <mesh position-y={0.58} castShadow>
      <boxGeometry args={[2.35, 0.5, 1.32]} />
      <meshStandardMaterial color={RED} />
    </mesh>
    {/* cabin */}
    <mesh position={[-0.25, 1.06, 0]} castShadow>
      <boxGeometry args={[1.15, 0.46, 1.2]} />
      <meshStandardMaterial color={RED} />
    </mesh>
    {/* window band */}
    <mesh position={[-0.25, 1.03, 0]}>
      <boxGeometry args={[1.21, 0.26, 1.26]} />
      <meshStandardMaterial color={GLASS} />
    </mesh>
    {/* roof rack */}
    <mesh position={[-0.25, 1.36, 0]} castShadow>
      <boxGeometry args={[0.95, 0.07, 1.05]} />
      <meshStandardMaterial color={DARK} />
    </mesh>
    {[-0.3, 0, 0.3].map((z) => (
      <mesh key={z} position={[0.26, 1.34, z]}>
        <boxGeometry args={[0.08, 0.08, 0.18]} />
        <meshStandardMaterial color={HEAD} emissive={HEAD} emissiveIntensity={0.6} />
      </mesh>
    ))}
    {[1.22, -1.22].map((x) => (
      <mesh key={x} position={[x, 0.45, 0]} castShadow>
        <boxGeometry args={[0.22, 0.34, 1.36]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
    ))}
    {[0.72, -0.72].map((z) => (
      <mesh key={z} position={[0, 0.36, z]}>
        <boxGeometry args={[1.4, 0.1, 0.14]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
    ))}
    {[0.42, -0.42].map((z) => (
      <mesh key={z} position={[1.34, 0.62, z]}>
        <boxGeometry args={[0.06, 0.14, 0.24]} />
        <meshStandardMaterial color={HEAD} emissive={HEAD} emissiveIntensity={1.4} />
      </mesh>
    ))}
    {[0.42, -0.42].map((z) => (
      <mesh key={z} position={[-1.34, 0.62, z]}>
        <boxGeometry args={[0.05, 0.12, 0.2]} />
        <meshStandardMaterial color={TAIL} emissive={TAIL} emissiveIntensity={0.5} />
      </mesh>
    ))}
  </group>
)

const Wheel = () => (
  <>
    <mesh rotation-x={Math.PI / 2} castShadow>
      <cylinderGeometry args={[WHEEL_RADIUS, WHEEL_RADIUS, 0.26, 12]} />
      <meshStandardMaterial color={TIRE} flatShading />
    </mesh>
    <mesh rotation-x={Math.PI / 2}>
      <cylinderGeometry args={[0.17, 0.17, 0.28, 6]} />
      <meshStandardMaterial color={HUB} flatShading />
    </mesh>
  </>
)

const TruckModel: CarModel = {
  id: 'truck',
  label: 'Off-road Truck',
  wheelRadius: WHEEL_RADIUS,
  wheels: [
    { x: 0.78, z: 0.74, front: true },
    { x: 0.78, z: -0.74, front: true },
    { x: -0.78, z: 0.74, front: false },
    { x: -0.78, z: -0.74, front: false },
  ],
  Body,
  Wheel,
}

export default TruckModel
