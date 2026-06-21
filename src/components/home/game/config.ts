/**
 * ============================================================
 *  CONFIG DEL JUEGO  ->  toca SOLO esto para cambiar el juego
 * ============================================================
 *
 * Todo lo "tuneable" vive aca: tamaños, colores, velocidades,
 * cantidad de carriles, decoracion (pasto/arena/flores/arboles), etc.
 *
 * Los sprites (los dibujos de los autos en pixel art) estan en
 * `sprites.ts`. La escena (ruta + decoracion) se dibuja en `render.ts`.
 */

export const GAME_CONFIG = {
  /** Resolucion interna del canvas (en px). El canvas se escala solo
   *  al ancho del contenedor manteniendo este aspecto. Ancho > alto
   *  para que el juego sea bien "ancho". */
  view: {
    width: 540,
    height: 440,
  },

  /** Ancho maximo del canvas dentro del cabinet (px). */
  displayMaxWidth: 460,

  /** Persistencia (localStorage). */
  bestScoreKey: 'car-game-best', // record personal del jugador
  collapseKey: 'car-game-collapsed', // estado plegado/desplegado

  /** Cantidad de carriles de la autopista. */
  lanes: 6,

  /** Escala del pixel art: cada "celda" del sprite ocupa N px. */
  pixelScale: 3,

  /** Sombra que proyecta cada auto sobre el asfalto. */
  shadow: {
    offsetX: 5,
    offsetY: 6,
    alpha: 0.28,
  },

  road: {
    // --- Asfalto: centro mas claro, costados mas oscuros ---
    asphaltCenter: '#5f656b',
    asphaltEdge: '#4f545a',
    laneTint: 0.05, // variacion sutil por carril (0-1)

    laneLine: '#f1f0ea', // lineas blancas punteadas del medio
    edgeLine: '#e6e5dd', // lineas solidas del borde de la ruta

    grassWidth: 88, // ancho TOTAL del costado (pasto + arena) por lado
    sandWidth: 12, // de ese costado, cuanto es arena pegada a la ruta
    shoulderWidth: 6, // separacion de la linea de borde

    // Bordes irregulares (dentado pixelado entre pasto/arena/ruta).
    edgeJitter: 4, // amplitud del dentado (px)
    edgeStep: 5, // alto de cada "escalon" del dentado (px)

    dashLength: 26, // largo de cada raya punteada
    dashGap: 22, // espacio entre rayas
    dashWidth: 5, // grosor de las rayas
  },

  /** Decoracion de los costados (pasto, arena, flores, arboles). */
  scenery: {
    grassBase: '#57a23f', // verde principal
    grassDark: '#478a33', // verde oscuro (textura)
    grassLight: '#74bd55', // verde claro (textura)
    sand: '#caa85a', // arena
    sandDark: '#b08f47', // arena oscura (textura)

    flowerWhite: '#f4f4ee',
    flowerYellow: '#ffd84a',
    flowerRed: '#e8443a',

    treeTrunk: '#6b4423',
    treeLeafDark: '#2f6e25',
    treeLeaf: '#3f8a30',
    treeLeafLight: '#5fb046',

    speckleSpacing: 11, // separacion de la textura de pasto
    decorSpacing: 50, // separacion de flores/arboles
    treeChance: 0.22, // prob. de que la decoracion sea un arbol
    flowerChance: 0.55, // prob. de que sea flor (sino, nada)
  },

  player: {
    color: '#23272e',
    horizontalSpeed: 4.6,
    bottomMargin: 30,
    startLane: 2,
  },

  /** Cuanto se queda congelado el frame del choque antes de aparecer
   *  el cartel de GAME OVER (ms). */
  crashFreezeMs: 850,

  traffic: {
    baseSpeed: 2.3,
    speedGrowth: 0.0016, // acelera con el score
    maxSpeed: 9.5,
    /** Velocidad de los autos enemigos RELATIVA al scroll de la ruta.
     *  < 1 => las lineas/pasto se mueven mas rapido que los autos, asi
     *  parece que el jugador va rapido y los esquiva (no que estan quietos). */
    enemySpeedFactor: 0.55,
    /** Arranca con pocos autos: intervalo grande al principio que se va
     *  achicando con el score. */
    spawnIntervalMs: 1500,
    minSpawnIntervalMs: 340,
    spawnRampMs: 0.13,
    doubleSpawnChance: 0.06, // casi siempre 1 auto al principio
    doubleSpawnGrowth: 0.00009,
    doubleSpawnMax: 0.72,
    colors: ['#e7e9ea', '#cf3a33', '#3b7fd4', '#c9ccce', '#e4b53b', '#7b4fd0'],
  },

  scorePerSecond: 100,
} as const

export type GameConfig = typeof GAME_CONFIG
