import { useEffect, useRef, useState } from 'react'
import Section from '../shared/SectionContainer'
import GlassCard from '../shared/GlassCard'
import {
  IconPaint,
  IconInfoCircle,
  IconVolumeOff,
  IconVolume,
} from '@tabler/icons-react'
import {
  BACKGROUND_TYPES,
  ACCENT_COLORS,
  useBackground,
  type ThemeName,
} from '@/context/Context'

const BentoSettings = () => {
  const [mouseEffect, setMouseEffect] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    background,
    setBackground,
    themeName,
    changeTheme,
    accentColor,
    changeAccentColor,
  } = useBackground()

  // Configurar volumen del audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.03
    }
  }, [])

  // Music toggle
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.error('Error al intentar reproducir el audio:', error)
              setIsPlaying(false)
            })
        }
      }
    }
  }

  // esto es para poder poner nombres pioals
  const themeNames: { key: ThemeName; label: string }[] = [
    { key: 'light_mode', label: 'light mode' },
    { key: 'dark_mode', label: 'dark mode' },
    // { key: 'latte', label: 'Latte' },
    // { key: 'default', label: 'Default' },
    // { key: 'frappe', label: 'Frappe' },
    // { key: 'macchiato', label: 'Macchiato' },
    // { key: 'mocha', label: 'Mocha' },
  ]

  return (
    <Section
      title="Choose Your Vibe"
      children={
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Theme Selector */}
          <GlassCard className="overflow-hidden">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">
                <IconPaint stroke={1.5} />
              </span>
              <h3 className="text-xl font-semibold text-white">Theme</h3>
            </div>

            {/*//? Themes ver si dejarlo o no */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              {themeNames.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => changeTheme(theme.key)}
                  className={`rounded-app cursor-pointer px-4 py-2 text-center transition-all duration-300 hover:text-white ${
                    themeName === theme.key
                      ? 'border-selected-app bg-selected-btn text-white'
                      : 'border-app text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>

            {/* Accent colors */}
            <div className="grid grid-cols-7 gap-1">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => changeAccentColor(color.name)}
                  className={`h-12 w-12 cursor-pointer justify-self-center rounded-lg transition-all duration-200 hover:scale-110 ${
                    accentColor === color.name
                      ? 'ring-offset-bg-glass ring-border-app ring-1 ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Mouse effect toggle */}
            <button
              onClick={() => setMouseEffect(!mouseEffect)}
              className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 transition-all duration-300 hover:bg-white/10"
            >
              <span>Mouse effect {mouseEffect ? 'on' : 'off'}</span>
            </button>
          </GlassCard>

          {/* Background Selector */}
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <span className="group/item relative text-2xl">
                <IconInfoCircle stroke={1.5} />

                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-18 left-0 whitespace-normal opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                  <div className="border-selected-app bg-bg-glass/80 rounded-lg p-1.5 px-3 backdrop-blur-lg">
                    <div className="w-47 text-xs text-white">
                      Some backgrounds use Three.js for 3D effects. May cause
                      performance issues on low-end devices.
                    </div>
                  </div>
                </div>
              </span>
              <h3 className="text-xl font-semibold text-white">Background</h3>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              {BACKGROUND_TYPES.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  className={`rounded-app cursor-pointer px-4 py-2 text-center transition-all duration-300 hover:text-white ${
                    background === bg
                      ? 'border-selected-app bg-selected-btn text-white'
                      : 'border-app text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Recent Commits con música */}
          <GlassCard className="overflow-hidden md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white">
                  Recent Commits
                </h3>
              </div>

              {/* Audio player oculto */}
              <audio ref={audioRef} loop>
                <source
                  src="/music/Comet Observatory 3 - Super Mario Galaxy Music - Extended.mp3"
                  type="audio/mpeg"
                />
              </audio>

              {/* Botón de música */}
              <button
                onClick={toggleMusic}
                className="border-app border-hover-app hover:bg-bg-selected/10 cursor-pointer rounded-full p-3 transition"
              >
                {isPlaying ? (
                  <IconVolume stroke={1.5} />
                ) : (
                  <IconVolumeOff stroke={1.5} />
                )}
              </button>
            </div>

            {/* Contenido de commits - placeholder */}
            <p className="text-neutral-400">
              Recent commit activity will appear here...
            </p>
          </GlassCard>
        </div>
      }
    />
  )
}

export default BentoSettings
