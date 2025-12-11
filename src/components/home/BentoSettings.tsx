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
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.03)

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
      audioRef.current.volume = 0.02
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

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
              {themeNames.map((theme) => {
                const isDisabled = theme.key === 'light_mode'

                return (
                  <button
                    key={theme.key}
                    onClick={() => !isDisabled && changeTheme(theme.key)}
                    disabled={isDisabled}
                    className={`rounded-app px-4 py-2 text-center transition-all duration-300 ${
                      themeName === theme.key && !isDisabled
                        ? 'border-selected-app bg-selected-btn text-white'
                        : 'border-app text-neutral-400 hover:text-neutral-200'
                    } ${isDisabled ? 'cursor-default opacity-40 hover:text-neutral-400' : 'border-hover-app cursor-pointer'} `}
                  >
                    {theme.label}
                  </button>
                )
              })}
            </div>

            {/* Accent colors */}
            <div className="mb-4 grid grid-cols-7 gap-1">
              {ACCENT_COLORS.map((color) => {
                if (color.name !== 'white') {
                  return (
                    <button
                      key={color.name}
                      onClick={() => changeAccentColor(color.name)}
                      className={`h-10 w-10 cursor-pointer justify-self-center rounded-lg transition-all duration-200 hover:scale-110 lg:h-12 lg:w-12 ${
                        accentColor === color.name
                          ? 'ring-offset-bg-glass ring-border-app z-1 ring-1 ring-offset-2'
                          : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  )
                }
              })}
            </div>

            {/* Audio player oculto ???*/}
            <audio ref={audioRef} loop>
              <source
                src="/music/Comet Observatory 3 - Super Mario Galaxy Music - Extended.mp3"
                type="audio/mpeg"
              />
            </audio>

            <div className="border-app border-hover-app bg-techitem flex items-center justify-center gap-4 rounded-xl px-4 py-3 backdrop-blur-md">
              {/* Botón de música */}
              <button
                onClick={toggleMusic}
                className="border-app border-hover-app bg-techitem-hover cursor-pointer rounded-full p-2 transition"
              >
                {isPlaying ? (
                  <IconVolume stroke={1.5} />
                ) : (
                  <IconVolumeOff stroke={1.5} />
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 px-1">
                <span className="text-xs text-neutral-400">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="0.1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="volume-slider"
                />
              </div>
            </div>
          </GlassCard>

          {/* Background Selector */}
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <span className="group/item relative text-2xl">
                <IconInfoCircle stroke={1.5} />

                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-18 left-0 whitespace-normal opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                  <div className="border-selected-app rounded-lg bg-[#1c1c1c]/96 p-1.5 px-3 backdrop-blur-lg">
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
              {BACKGROUND_TYPES.map((bg) => {
                const isDisabled = bg === 'White'

                return (
                  <button
                    key={bg}
                    onClick={() => setBackground(bg)}
                    disabled={isDisabled}
                    className={`rounded-app px-2.5 py-2 text-center transition-all duration-300 lg:px-4 ${
                      background === bg
                        ? 'border-selected-app bg-selected-btn text-white'
                        : 'border-app text-neutral-400 hover:text-neutral-200'
                    } ${isDisabled ? 'cursor-default opacity-40 hover:text-neutral-400' : 'border-hover-app cursor-pointer'} `}
                  >
                    {bg}
                  </button>
                )
              })}
            </div>
          </GlassCard>

          {/* Recent Commits con música */}
          <GlassCard className="overflow-hidden md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white">
                  Play a game
                </h3>
              </div>
            </div>

            {/* Contenido de commits - placeholder */}
            <p className="text-neutral-400">coming soon...</p>
          </GlassCard>
        </div>
      }
    />
  )
}

export default BentoSettings
