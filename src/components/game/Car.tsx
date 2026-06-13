import { useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3, type Group } from 'three'
import {
  CHECK_RADIUS,
  CHECKPOINT,
  nearestRoad,
  ROAD_HALF,
  ROAD_LIMIT,
  SPAWN,
  START,
  type GameControls,
} from './trackData'
import {
  completeLap,
  lapTiming,
  resetLap,
  startTiming,
  tickTiming,
} from './lapStore'
import type { CarModel } from './cars'

const MAX_SPEED = 13
const MAX_REVERSE = 4.5
const ACCEL = 16
const BRAKE = 26
const TURN_RATE = 2.5

const camPos = new Vector3()
const camLook = new Vector3()
const fwd = new Vector3()

type CarProps = {
  controls: RefObject<GameControls>
  model: CarModel
}

const Car = ({ controls, model }: CarProps) => {
  const carRef = useRef<Group>(null)
  const bodyRef = useRef<Group>(null)
  const steerRefs = useRef<(Group | null)[]>([])
  const spinRefs = useRef<(Group | null)[]>([])

  const state = useRef({
    x: SPAWN.x,
    z: SPAWN.z,
    heading: SPAWN.heading,
    speed: 0,
    steer: 0,
    spin: 0,
    onRail: false,
    lastReset: 0,
    camSnapped: false,
    // reloj propio: acumula dt clampeado solo en frames reales, así pausar el
    // canvas (frameloop) o esconder la pestaña no corrompe la vuelta en curso
    clockT: 0,
    // lap tracking
    prevSide: 0,
    sideInit: false,
    armed: false,
  })

  useFrame(({ camera }, delta) => {
    const s = state.current
    const input = controls.current
    const dt = Math.min(delta, 0.05)
    s.clockT += dt
    const t = s.clockT

    if (input.resetCount !== s.lastReset) {
      s.lastReset = input.resetCount
      s.x = SPAWN.x
      s.z = SPAWN.z
      s.heading = SPAWN.heading
      s.speed = 0
      s.steer = 0
      s.onRail = false
      s.sideInit = false
      s.armed = false
      resetLap()
    }

    const throttle = (input.forward ? 1 : 0) - (input.back ? 1 : 0)
    const steerTarget = (input.left ? 1 : 0) - (input.right ? 1 : 0)
    s.steer = MathUtils.damp(s.steer, steerTarget, 8, dt)

    if (throttle > 0) {
      s.speed += (s.speed < 0 ? BRAKE : ACCEL) * dt
    } else if (throttle < 0) {
      s.speed -= (s.speed > 0 ? BRAKE : ACCEL * 0.7) * dt
    } else {
      s.speed = MathUtils.damp(s.speed, 0, 1.8, dt)
      if (Math.abs(s.speed) < 0.05) s.speed = 0
    }
    s.speed = MathUtils.clamp(s.speed, -MAX_REVERSE, MAX_SPEED)

    // la autoridad de giro escala con la velocidad (no gira parado)
    const grip = MathUtils.clamp(Math.abs(s.speed) / 4, 0, 1)
    const dir = s.speed < 0 ? -1 : 1
    s.heading += s.steer * TURN_RATE * grip * dir * dt

    s.x += Math.cos(s.heading) * s.speed * dt
    s.z -= Math.sin(s.heading) * s.speed * dt

    // contención a la ruta (guardrail) — frame-rate independiente
    const near = nearestRoad(s.x, s.z)
    if (near.d > ROAD_LIMIT) {
      const ux = (s.x - near.px) / near.d
      const uz = (s.z - near.pz) / near.d
      s.x = near.px + ux * ROAD_LIMIT
      s.z = near.pz + uz * ROAD_LIMIT
      if (!s.onRail) {
        s.speed *= 0.5 // impulso único al tocar
        s.onRail = true
      } else {
        s.speed *= Math.exp(-2.5 * dt) // roce continuo
      }
    } else {
      s.onRail = false
    }

    // --- detección de vueltas ---
    const sx = s.x - START.x
    const sz = s.z - START.z
    const sideDot = sx * START.fx + sz * START.fz
    const lateral = Math.abs(sx * START.nx + sz * START.nz)

    const cdx = s.x - CHECKPOINT.x
    const cdz = s.z - CHECKPOINT.z
    if (cdx * cdx + cdz * cdz < CHECK_RADIUS * CHECK_RADIUS) s.armed = true

    if (
      s.sideInit &&
      s.prevSide < 0 &&
      sideDot >= 0 &&
      lateral < ROAD_HALF + 1
    ) {
      if (lapTiming.status === 'idle') {
        startTiming(t)
        s.armed = false
      } else if (s.armed) {
        completeLap(t)
        s.armed = false
      }
    }
    s.prevSide = sideDot
    s.sideInit = true

    tickTiming(t)

    // ruedas + carrocería
    s.spin -= (s.speed / model.wheelRadius) * dt
    if (carRef.current) {
      carRef.current.position.set(s.x, 0, s.z)
      carRef.current.rotation.y = s.heading
    }
    if (bodyRef.current) {
      const lean = s.steer * grip * 0.06 // roll hacia afuera de la curva
      bodyRef.current.rotation.x = MathUtils.damp(
        bodyRef.current.rotation.x,
        lean,
        6,
        dt,
      )
      bodyRef.current.rotation.z = MathUtils.damp(
        bodyRef.current.rotation.z,
        throttle * 0.035 * grip,
        6,
        dt,
      )
    }
    for (const steer of steerRefs.current) {
      if (steer) steer.rotation.y = s.steer * 0.5
    }
    for (const spin of spinRefs.current) {
      if (spin) spin.rotation.z = s.spin
    }

    // cámara de persecución detrás del auto
    fwd.set(Math.cos(s.heading), 0, -Math.sin(s.heading))
    camPos.set(
      s.x - fwd.x * 7.5,
      4.2,
      s.z - fwd.z * 7.5,
    )
    camLook.set(s.x + fwd.x * 3, 0.9, s.z + fwd.z * 3)
    if (!s.camSnapped) {
      camera.position.copy(camPos)
      s.camSnapped = true
    } else {
      camera.position.lerp(camPos, 1 - Math.exp(-6 * dt))
    }
    camera.lookAt(camLook)
  })

  const Body = model.Body
  const Wheel = model.Wheel

  return (
    <group ref={carRef}>
      <group ref={bodyRef}>
        <Body />
      </group>

      {model.wheels.map((w, i) => (
        <group
          key={i}
          position={[w.x, model.wheelRadius, w.z]}
          ref={(el) => {
            if (w.front) steerRefs.current[i] = el
          }}
        >
          <group
            ref={(el) => {
              spinRefs.current[i] = el
            }}
          >
            <Wheel />
          </group>
        </group>
      ))}
    </group>
  )
}

export default Car
