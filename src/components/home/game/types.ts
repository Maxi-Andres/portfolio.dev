export type GameStatus = 'idle' | 'playing' | 'crashed' | 'gameover'

export type VehicleKind = 'car'

/** Un vehiculo (jugador o enemigo). x/y son la esquina superior izquierda. */
export interface Car {
  x: number
  y: number
  width: number
  height: number
  color: string
  lane: number
  kind: VehicleKind
}

/** Estado del input en un frame dado. */
export interface InputState {
  left: boolean
  right: boolean
  /** Posicion X (en coords del mundo) si se controla con dedo/mouse. */
  pointerX: number | null
}

/** Estado completo del mundo del juego. Es mutable y vive en un ref:
 *  NO dispara renders de React, el loop lo actualiza frame a frame. */
export interface World {
  player: Car
  enemies: Car[]
  laneCenters: number[]
  roadLeft: number
  roadRight: number
  carWidth: number
  carHeight: number
  scrollY: number
  speed: number
  score: number
  spawnTimer: number
  lastSpawnLane: number
  status: GameStatus
  /** Punto del impacto (centro del solape) cuando chocas, para dibujar
   *  el efecto de choque sobre el frame congelado. */
  crash: { x: number; y: number } | null
}
