export type GameStatus = 'idle' | 'playing' | 'gameover'

/** Un auto (jugador o enemigo). x/y son la esquina superior izquierda. */
export interface Car {
  x: number
  y: number
  width: number
  height: number
  color: string
  lane: number
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
}
