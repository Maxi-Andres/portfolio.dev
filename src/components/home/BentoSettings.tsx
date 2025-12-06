import Section from '../shared/SectionContainer'
import { IconPaint } from '@tabler/icons-react'
import { IconInfoCircle } from '@tabler/icons-react'
import { IconVolumeOff } from '@tabler/icons-react'
import { IconVolume } from '@tabler/icons-react'
import { BACKGROUND_TYPES, useBackground } from '@/context/Context'
import { useEffect, useRef, useState } from 'react'

const BentoSettings = () => {
  const [theme, setTheme] = useState('Frappe')
  const [MouseEffect, setMouseEffect] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#f5c2e7')

  const themes = ['Latte', 'Frappe', 'Macchiato', 'Mocha']
  const colors = [
    '#f5e0dc',
    '#f2cdcd',
    '#f5c2e7',
    '#cba6f7',
    '#f38ba8',
    '#eba0ac',
    '#fab387',
    '#f9e2af',
    '#a6e3a1',
    '#94e2d5',
    '#89dceb',
    '#74c7ec',
    '#89b4fa',
    '#b4befe',
  ]

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.03
    }
  }, [])

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

  const { background, setBackground } = useBackground()

  return (
    <Section
      title="Choose Your Vibe"
      children={
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {/* Theme Selector - Ocupa 1 espacio */}
          <div className="glass-effect overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/40">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">
                <IconPaint stroke={1.5} />
              </span>
              <h3 className="text-xl font-semibold text-white">Theme</h3>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`cursor-pointer rounded-2xl px-4 py-2 text-center transition-colors duration-300 hover:text-white ${
                    theme === t
                      ? 'border-hover-app bg-selected-btn text-white'
                      : 'border-app text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-10 w-10 cursor-pointer justify-self-center rounded-lg transition-all duration-200 hover:scale-110 ${
                    selectedColor === color
                      ? 'ring-1 ring-neutral-400 ring-offset-2 ring-offset-[#181825]'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <button
              onClick={() => setMouseEffect(!MouseEffect)}
              className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 transition-all duration-300 hover:bg-white/10"
            >
              <span className="">
                Mouse effect {MouseEffect ? 'on' : 'off'}
              </span>
            </button>
          </div>

          {/* Background - Ocupa 1 espacio */}
          <div className="glass-effect overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/40">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">
                <IconInfoCircle stroke={1.5} />
              </span>
              <h3 className="text-xl font-semibold text-white">Background</h3>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              {BACKGROUND_TYPES.map((element) => (
                <button
                  key={element}
                  onClick={() => setBackground(element)}
                  className={`cursor-pointer rounded-2xl px-4 py-2 text-center transition-colors duration-300 hover:text-white ${
                    background === element
                      ? 'border-hover-app bg-selected-btn text-white'
                      : 'border-app text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {element}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Commits - Ocupa 2 espacios */}
          <div className="glass-effect overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/40 md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white">
                  Recent Commits
                </h3>
              </div>
              <audio ref={audioRef} loop>
                <source
                  src="/music/Comet Observatory 3 - Super Mario Galaxy Music - Extended.mp3"
                  type="audio/mpeg"
                />
              </audio>

              <button
                onClick={toggleMusic}
                className="fixed right-4 bottom-4 cursor-pointer rounded-full border border-white/10 p-3 transition hover:border-white/40 hover:bg-white/10"
              >
                {isPlaying ? (
                  <IconVolume stroke={1.5} />
                ) : (
                  <IconVolumeOff stroke={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default BentoSettings
