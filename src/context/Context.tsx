// contexts/BackgroundContext.tsx
import { createContext, useContext, useState } from 'react'

export type BackgroundType =
  | 'White'
  | 'Black'
  | 'Neon Glow'
  | 'Shooting Stars'
  | 'Light Pillar'
  | 'Letter Glitch'

// esto es para poder iterar despues
export const BACKGROUND_TYPES: BackgroundType[] = [
  'White',
  'Black',
  'Neon Glow',
  'Shooting Stars',
  'Light Pillar',
  'Letter Glitch',
]

interface BackgroundContextType {
  background: BackgroundType
  setBackground: (bg: BackgroundType) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
)

// se podria guardar en el localstorage el fondo
export const BackgroundProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [background, setBackground] = useState<BackgroundType>('Neon Glow')

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackground = () => {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error('useBackground debe usarse dentro de BackgroundProvider')
  }
  return context
}
