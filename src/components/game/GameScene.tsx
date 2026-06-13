import { type RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import Car from './Car'
import Road from './Road'
import Touge from './Touge'
import { PALETTE, SPAWN, type GameControls } from './trackData'
import type { CarModel } from './cars'

type GameSceneProps = {
  controls: RefObject<GameControls>
  car: CarModel
  paused: boolean
}

const GameScene = ({ controls, car, paused }: GameSceneProps) => (
  <Canvas
    shadows
    dpr={[1, 1.75]}
    frameloop={paused ? 'never' : 'always'}
    camera={{
      fov: 55,
      near: 0.5,
      far: 400,
      position: [SPAWN.x - 8, 4.5, SPAWN.z],
    }}
    style={{ touchAction: 'pan-y' }}
  >
    <color attach="background" args={[PALETTE.sky]} />
    <fog attach="fog" args={[PALETTE.fog, 55, 165]} />

    <ambientLight color="#cfe0ec" intensity={0.72} />
    <hemisphereLight args={['#e3f0f8', '#6c7d4a', 0.6]} />
    <directionalLight
      color="#fff4e0"
      intensity={1.7}
      position={[28, 40, 18]}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-left={-50}
      shadow-camera-right={50}
      shadow-camera-top={50}
      shadow-camera-bottom={-50}
      shadow-camera-near={5}
      shadow-camera-far={130}
      shadow-bias={-0.0004}
    />

    <Touge />
    <Road />
    <Car controls={controls} model={car} />
  </Canvas>
)

export default GameScene
