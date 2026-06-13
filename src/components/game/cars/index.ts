import type { FC } from 'react'
import Ae86Model from './Ae86Model'
import TruckModel from './TruckModel'

// Modelo de auto: visuales separadas de la física (que vive en Car.tsx).
// El controlador envuelve <Body /> en un grupo para el lean/pitch y coloca
// las ruedas en `wheels` usando <Wheel /> dentro de grupos de steer/spin.
export type CarModel = {
  id: string
  label: string
  wheelRadius: number
  wheels: { x: number; z: number; front: boolean }[]
  Body: FC
  Wheel: FC
}

// Para sumar/sacar autos: editá este array. El primero es el default.
export const CARS: CarModel[] = [Ae86Model, TruckModel]

// 👇 Para cambiar el auto por código, cambiá este id ('ae86' | 'truck')
export const DEFAULT_CAR_ID = 'ae86'

export const getCar = (id: string): CarModel =>
  CARS.find((c) => c.id === id) ?? CARS[0]
