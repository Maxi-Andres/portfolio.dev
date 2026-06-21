/**
 * ============================================================
 *  CONFIG DEL JUEGO  ->  toca SOLO esto para cambiar el juego
 * ============================================================
 *
 * Todo lo "tuneable" vive aca: tamaños, colores, velocidades,
 * cantidad de carriles, etc. Si queres que el juego sea mas
 * dificil, mas rapido, con otros colores, etc -> cambias aca y
 * el resto del codigo se adapta solo.
 *
 * Los sprites (los dibujos de los autos en pixel art) estan en
 * `sprites.ts`, ese es el otro archivo que vas a querer tocar.
 */

export const GAME_CONFIG = {
  /** Resolucion interna del canvas (en px). El canvas se escala solo
   *  al ancho del contenedor manteniendo este aspecto. */
  view: {
    width: 380,
    height: 400,
  },

  /** Cantidad de carriles de la autopista. */
  lanes: 5,

  /** Escala del pixel art: cada "celda" del sprite ocupa N px.
   *  Mas grande = autos mas grandes y pixelado mas marcado.
   *  (El sprite del auto es de 14x26 celdas -> auto de 42x78 px.) */
  pixelScale: 3,

  /** Sombra que proyecta cada auto sobre el asfalto. */
  shadow: {
    offsetX: 5, // desplazamiento a la derecha (px)
    offsetY: 6, // desplazamiento hacia abajo (px)
    alpha: 0.28, // opacidad (0-1)
  },

  road: {
    // --- Pasto: varios verdes para que tenga mas detalle ---
    grassOuter: '#86a85e', // verde de los bordes externos
    grassInner: '#74974a', // verde pegado a la ruta
    grassEdge: '#557a37', // franja oscura contra el asfalto
    grassTufts: ['#5f7d3d', '#9cbd6e', '#6f9047'], // mechones que se mueven
    tuftSpacing: 24, // separacion vertical entre mechones
    tuftSize: 4, // tamaño del mechon (px)

    // --- Asfalto: el centro es mas claro y se oscurece hacia los costados ---
    asphaltCenter: '#676d72',
    asphaltEdge: '#565b60',
    laneTint: 0.05, // cuanto se oscurecen los carriles alternos (0-1)

    laneLine: '#eceae4', // lineas blancas punteadas del medio
    edgeLine: '#d7d7d1', // lineas solidas del borde de la ruta
    grassWidth: 26, // ancho del pasto a cada lado (px)
    shoulderWidth: 5, // ancho del borde/banquina (px)
    dashLength: 26, // largo de cada raya punteada
    dashGap: 24, // espacio entre rayas
    dashWidth: 5, // grosor de las rayas
  },

  player: {
    color: '#23272e', // color del auto del jugador (negro, como la foto)
    horizontalSpeed: 4.4, // px por frame (a 60fps) al moverse con flechas
    bottomMargin: 30, // distancia del auto al borde inferior
    startLane: 2, // carril inicial (0-indexed, 2 = centro en 5 carriles)
  },

  traffic: {
    /** Velocidad base con la que "baja" el mundo (px/frame a 60fps). */
    baseSpeed: 2.6,
    /** Cuanto acelera el mundo por cada punto de score (mas alto = se
     *  vuelve rapido antes). */
    speedGrowth: 0.0016,
    /** Tope de velocidad para que no se vuelva imposible. */
    maxSpeed: 9,
    /** Cada cuanto (ms) aparece un auto al principio. */
    spawnIntervalMs: 1000,
    /** Intervalo minimo de aparicion (cuando ya vas rapido). */
    minSpawnIntervalMs: 340,
    /** Cuanto se reduce el intervalo por cada punto de score (ms). */
    spawnRampMs: 0.12,
    /** Probabilidad base (0-1) de que aparezca un 2do auto a la vez. */
    doubleSpawnChance: 0.16,
    /** Cuanto sube esa probabilidad por punto de score. */
    doubleSpawnGrowth: 0.00008,
    /** Tope de esa probabilidad. */
    doubleSpawnMax: 0.7,
    /** Colores posibles de los autos enemigos (pixel art usa cada uno
     *  como color de carroceria y deriva sombras/luces solo). */
    colors: ['#e7e9ea', '#cf3a33', '#3b7fd4', '#c9ccce', '#e4b53b'],
  },

  /** Puntos que sumas por segundo sobrevivido. */
  scorePerSecond: 100,
} as const

export type GameConfig = typeof GAME_CONFIG
