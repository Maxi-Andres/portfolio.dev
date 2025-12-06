import ExperienceInfo from '@/components/home/ExperienceInfo'
import Section from '../shared/SectionContainer'
import { useState } from 'react'

const Experience = () => {
  const [active, setActive] = useState<'work' | 'studies'>('work')

  return (
    <Section
      title="Experience"
      children={
        <>
          <div className="w-full">
            <ul className="glass-effect rounded-app border-app flex w-full shadow-lg">
              <button
                className={`w-1/2 cursor-pointer rounded-2xl px-4 py-2 text-center hover:text-white ${
                  active === 'work'
                    ? 'border-hover-app border-border-app bg-selected-btn text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                onClick={() => setActive('work')}
              >
                Work
              </button>

              <button
                className={`w-1/2 cursor-pointer rounded-2xl px-4 py-2 text-center hover:text-white ${
                  active === 'studies'
                    ? 'border-hover-app border-border-app bg-selected-btn text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                onClick={() => setActive('studies')}
              >
                Studies
              </button>
            </ul>
          </div>
          <ExperienceInfo active={active} />
        </>
      }
    />
  )
}

export default Experience

// si le pongo transition-colors duration-300, se pone blanco un segundo porque no tiene borde y de repente le pone uno de color blanco
