// import { BackgroundBeams } from '@/components/ui/background-beams'
import Section from '../shared/SectionContainer'
import GlassCard from '../shared/GlassCard'
import { IconClock } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const Footer = () => {
  const [timeSpent, setTimeSpent] = useState(() => {
    const saved = localStorage.getItem('timeSpent')
    return saved ? Number(saved) : 0
  })
  const [visits, setVisits] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (secs: number) => {
    // Si es menos de 1 hora → MM:SS
    if (secs < 3600) {
      const minutes = Math.floor(secs / 60)
      const seconds = secs % 60
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    // Si es 1 hora o mas → HH:MM:SS
    const hours = Math.floor(secs / 3600)
    const minutes = Math.floor((secs % 3600) / 60)
    const seconds = secs % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  useEffect(() => {
    const saveTime = () => {
      localStorage.setItem('timeSpent', String(timeSpent))
    }

    window.addEventListener('beforeunload', saveTime)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) saveTime()
    })

    return () => {
      window.removeEventListener('beforeunload', saveTime)
    }
  }, [timeSpent])

  // ! cambia la url misite.com a la pagina real
  // – Abacus IaaS
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch(
          'https://abacus.jasoncameron.dev/hit/misite.com/visits',
          { method: 'GET' }
        )
        const data = await res.json()
        if (data.value !== undefined) setVisits(data.value)
      } catch (err) {
        console.error('Error al obtener visitas:', err)
      }
    }

    fetchVisits()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <Section
        children={
          <GlassCard
            className="flex h-70 w-full flex-col justify-between overflow-hidden md:h-50 md:flex-row"
            children={
              <>
                {/* //? no se si me termina de convencer */}
                {/* <BackgroundBeams className="scale-[1.5] translate-y-[-5%] -z-10" /> */}
                <div className="logo mb-5 flex flex-col justify-end md:mb-0">
                  <p className="text-4xl">Maximiliano Andres</p>
                </div>

                <div className="flex space-x-4 sm:space-x-8">
                  <div className="menu md:mb-0">
                    <h3 className="mb-4 text-neutral-300">Stats</h3>
                    <ul className="flex flex-col font-light text-neutral-500">
                      <li>
                        <div
                          className="flex gap-1"
                          title="How long you have been surfing my site"
                        >
                          <IconClock stroke={1.5} className="w-4" />
                          <span className="tabular-nums">
                            {formatTime(timeSpent)}
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="" title="View Site Analytics ">
                          {visits === null
                            ? '...'
                            : `${visits.toLocaleString()} views`}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="menu mb-6 md:mb-0">
                    <h3 className="mb-4 text-neutral-300">Explore</h3>
                    <ul className="flex flex-col font-light text-neutral-500">
                      <li>
                        <a
                          onClick={() => scrollToSection('home')}
                          className="cursor-pointer hover:text-neutral-300 hover:underline"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => scrollToSection('projects')}
                          className="cursor-pointer hover:text-neutral-300 hover:underline"
                        >
                          Projects
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => scrollToSection('about')}
                          className="cursor-pointer hover:text-neutral-300 hover:underline"
                        >
                          About
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="contacts">
                    <h3 className="mb-4 text-neutral-300">Let's Connect</h3>
                    <ul className="flex flex-col font-light text-neutral-500">
                      <li>
                        <a
                          href="mailto:max.bianchimano@gmail.com"
                          target="_blank"
                          className="hover:text-neutral-300 hover:underline"
                        >
                          Email
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.linkedin.com/in/maximiliano-andres-bianchimano/"
                          target="_blank"
                          className="hover:text-neutral-300 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://github.com/Maxi-Andres"
                          target="_blank"
                          className="hover:text-neutral-300 hover:underline"
                        >
                          GitHub
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            }
          />
        }
      />
    </>
  )
}

export default Footer
