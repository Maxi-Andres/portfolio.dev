// Estado de cronometraje compartido entre el auto (loop imperativo de useFrame)
// y el HUD (DOM). Vive a nivel módulo porque hay una sola instancia del juego;
// las mutaciones se encapsulan en funciones para no tocar props desde el render.
import { createTiming, type LapTiming } from './trackData'

export const lapTiming: LapTiming = createTiming()

export const startTiming = (t: number) => {
  lapTiming.status = 'running'
  lapTiming.lapStart = t
}

export const completeLap = (t: number) => {
  const lap = t - lapTiming.lapStart
  // guard defensivo: nunca registrar una vuelta no positiva
  if (lap <= 0) {
    lapTiming.lapStart = t
    return
  }
  lapTiming.last = lap
  if (lapTiming.best === 0 || lap < lapTiming.best) lapTiming.best = lap
  lapTiming.laps += 1
  lapTiming.lapStart = t
  lapTiming.rev += 1
}

export const tickTiming = (t: number) => {
  lapTiming.current =
    lapTiming.status === 'running' ? t - lapTiming.lapStart : 0
}

// reset del auto (R): limpia la vuelta en curso, conserva la mejor
export const resetLap = () => {
  lapTiming.status = 'idle'
  lapTiming.lapStart = 0
  lapTiming.current = 0
  lapTiming.laps = 0
  lapTiming.last = 0
}

// sesión nueva (abrir el juego): limpia todo
export const resetLapSession = () => {
  resetLap()
  lapTiming.best = 0
  lapTiming.rev = 0
}
