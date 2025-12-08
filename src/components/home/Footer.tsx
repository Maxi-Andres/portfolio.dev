import { Link } from 'react-router-dom'
// import { BackgroundBeams } from '@/components/ui/background-beams'
import Section from '../shared/SectionContainer'
import GlassCard from '../shared/GlassCard'

const Footer = () => {
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
                <div className="logo mb-6 flex flex-col justify-end md:mb-0">
                  <p className="text-4xl">Maximiliano Andres.</p>
                </div>

                <div className="flex flex-row space-x-12">
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
