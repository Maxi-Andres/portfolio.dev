import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type BackgroundType =
  | 'White'
  | 'Black'
  | 'Neon Glow'
  | 'Shooting Stars'
  | 'Light Pillar'
  | 'Letter Glitch'

// export type ThemeName = 'latte' | 'frappe' | 'macchiato' | 'mocha'
export type ThemeName = 'light_mode' | 'dark_mode'

export type AccentColor =
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
  | 'white'

interface Theme {
  '--color-border-app'?: string
  '--color-bg-glass': string
  '--color-bg-selected'?: string
}

interface BackgroundContextType {
  background: BackgroundType
  setBackground: (bg: BackgroundType) => void
  themeName: ThemeName
  changeTheme: (newTheme: ThemeName) => void
  accentColor: AccentColor
  changeAccentColor: (color: AccentColor) => void
}

export const BACKGROUND_TYPES: BackgroundType[] = [
  'White',
  'Black',
  'Neon Glow',
  'Shooting Stars',
  'Light Pillar',
  'Letter Glitch',
]

export const ACCENT_COLORS: { name: AccentColor; hex: string }[] = [
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

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
)

// ============================================
interface BackgroundProviderProps {
  children: ReactNode
}

export const BackgroundProvider = ({ children }: BackgroundProviderProps) => {
  const [background, setBackground] = useState<BackgroundType>('Neon Glow')
  const [themeName, setThemeName] = useState<ThemeName>('dark_mode')
  const [accentColor, setAccentColor] = useState<AccentColor>('white')

  // Cargar preferencias desde localStorage
  useEffect(() => {
    const savedBackground = localStorage.getItem('background') as BackgroundType
    const savedTheme = localStorage.getItem('theme') as ThemeName
    const savedAccent = localStorage.getItem('accentColor') as AccentColor

    if (savedBackground && BACKGROUND_TYPES.includes(savedBackground)) {
      setBackground(savedBackground)
    }
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme)
    }
    if (savedAccent) {
      setAccentColor(savedAccent)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const selectedTheme = themes[themeName]

    Object.entries(selectedTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    localStorage.setItem('theme', themeName)

    if (themeName === 'dark_mode') {
      setAccentColor('white')
    }
  }, [themeName])

  useEffect(() => {
    const root = document.documentElement
    const colorData = ACCENT_COLORS.find((c) => c.name === accentColor)

    if (colorData) {
      root.style.setProperty('--color-bg-selected', colorData.hex)
      root.style.setProperty('--color-border-app', colorData.hex)
    }

    localStorage.setItem('accentColor', accentColor)
  }, [accentColor])

  useEffect(() => {
    localStorage.setItem('background', background)
  }, [background])

  const changeTheme = (newTheme: ThemeName) => {
    if (themes[newTheme]) {
      setThemeName(newTheme)
    }
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
