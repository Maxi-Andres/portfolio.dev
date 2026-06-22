import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type BackgroundType =
  | 'White'
  | 'Neon Glow'
  | 'Shooting Stars'
  | 'Light Pillar'
  | 'Letter Glitch'
  | 'Color Bends'
  | 'Dither'
  | 'Faulty Terminal'
  | 'Boxes'
  | 'Ascii Roses'

export const BACKGROUND_TYPES: BackgroundType[] = [
  'White',
  'Neon Glow',
  'Shooting Stars',
  'Light Pillar',
  'Letter Glitch',
  'Color Bends',
  'Dither',
  'Faulty Terminal',
  'Boxes',
  'Ascii Roses',
]

export type AccentColor =
  | 'white'
  | 'rosewater'
  | 'flamingo'
  | 'pink'
  | 'mauve'
  | 'red'
  | 'maroon'
  | 'peach'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'sky'
  | 'sapphire'
  | 'blue'
  | 'lavender'

export const ACCENT_COLORS: { name: AccentColor; hex: string }[] = [
  { name: 'white', hex: '#ffffff' },
  { name: 'rosewater', hex: '#f5e0dc' },
  { name: 'flamingo', hex: '#f2cdcd' },
  { name: 'pink', hex: '#f5c2e7' },
  { name: 'mauve', hex: '#cba6f7' },
  { name: 'red', hex: '#f38ba8' },
  { name: 'maroon', hex: '#eba0ac' },
  { name: 'peach', hex: '#fab387' },
  { name: 'yellow', hex: '#f9e2af' },
  { name: 'green', hex: '#a6e3a1' },
  { name: 'teal', hex: '#94e2d5' },
  { name: 'sky', hex: '#89dceb' },
  { name: 'sapphire', hex: '#74c7ec' },
  { name: 'blue', hex: '#89b4fa' },
  { name: 'lavender', hex: '#b4befe' },
]

// export type ThemeName = 'latte' | 'frappe' | 'macchiato' | 'mocha'
export type ThemeName = 'light_mode' | 'dark_mode'

interface Theme {
  '--color-border-app'?: string
  '--color-bg-glass': string
  '--color-bg-selected'?: string
}

//? cambiar esto
export const themes: Record<ThemeName, Theme> = {
  light_mode: {
    '--color-border-app': 'black',
    '--color-bg-glass': '#eff1f5',
    '--color-bg-selected': 'black',
  },
  dark_mode: {
    '--color-border-app': 'white',
    '--color-bg-glass': '#1e1e2e',
    '--color-bg-selected': 'white',
  },

  // latte: {
  //   // '--color-border-app': '#4c4f69',
  //   '--color-bg-glass': '#eff1f5',
  //   // '--color-bg-selected': '#8839ef',
  // },
  // default: {
  //   '--color-border-app': 'white',
  //   '--color-bg-glass': '#1e1e2e',
  //   '--color-bg-selected': 'white',
  // },
  // macchiato: {
  //   '--color-border-app': '#ff0300',
  //   '--color-bg-glass': '#24273a',
  //   '--color-bg-selected': '#ffa000',
  // },
  // mocha: {
  //   '--color-border-app': '#0006ff',
  //   '--color-bg-glass': '#1e1e2e',
  //   '--color-bg-selected': '#0006ff',
  // },
}

interface BackgroundContextType {
  background: BackgroundType
  setBackground: (bg: BackgroundType) => void
  themeName: ThemeName
  changeTheme: (newTheme: ThemeName) => void
  accentColor: AccentColor
  changeAccentColor: (color: AccentColor) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
)

// ============================================
interface BackgroundProviderProps {
  children: ReactNode
}

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  // Inicializar desde localStorage SIN effect
  const [background, setBackground] = useState<BackgroundType>(() => {
    const saved = localStorage.getItem('background') as BackgroundType
    return saved && BACKGROUND_TYPES.includes(saved) ? saved : 'Neon Glow'
  })

  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = localStorage.getItem('theme') as ThemeName
    return saved && themes[saved] ? saved : 'dark_mode'
  })

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accentColor') as AccentColor
    return saved || 'white'
  })

  // Aplica el tema (light/dark) + accent color en un solo lugar.
  // Depende de ambos porque el accent pisa el color del borde/seleccion,
  // y el "white" tiene que resolver al default del tema (negro en light,
  // blanco en dark) para que no quede invisible sobre fondo blanco.
  useEffect(() => {
    const root = document.documentElement
    const theme = themes[themeName]

    // dark mode = clase .dark en <html> (la usa la variante dark: de Tailwind)
    root.classList.toggle('dark', themeName === 'dark_mode')
    root.style.colorScheme = themeName === 'dark_mode' ? 'dark' : 'light'

    // Fondo de los glass cards segun el tema
    root.style.setProperty('--color-bg-glass', theme['--color-bg-glass'])

    // Borde / seleccion: si el accent es "white" usamos el default del tema,
    // si no, el hex del accent elegido.
    const colorData = ACCENT_COLORS.find((c) => c.name === accentColor)
    const appColor =
      accentColor === 'white'
        ? (theme['--color-border-app'] ?? 'white')
        : (colorData?.hex ?? 'white')

    root.style.setProperty('--color-border-app', appColor)
    root.style.setProperty('--color-bg-selected', appColor)

    localStorage.setItem('theme', themeName)
    localStorage.setItem('accentColor', accentColor)
  }, [themeName, accentColor])

  useEffect(() => {
    localStorage.setItem('background', background)
  }, [background])

  const changeTheme = (newTheme: ThemeName) => {
    if (!themes[newTheme]) return
    setThemeName(newTheme)
    setAccentColor('white')
    // En light mode solo tiene sentido el fondo blanco; al volver a dark
    // restauramos el fondo por defecto.
    setBackground(newTheme === 'light_mode' ? 'White' : 'Neon Glow')
  }

  const changeAccentColor = (color: AccentColor) => {
    setAccentColor(color)
  }

  return (
    <BackgroundContext.Provider
      value={{
        background,
        setBackground,
        themeName,
        changeTheme,
        accentColor,
        changeAccentColor,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  )
}

// ============================================

export const useBackground = () => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground debe usarse dentro de BackgroundProvider')
  }
  return context
}
