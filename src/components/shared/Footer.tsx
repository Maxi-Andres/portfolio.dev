import { Link } from 'react-router-dom'
// import { BackgroundBeams } from '@/components/ui/background-beams'
import Section from '../shared/SectionContainer'

const Footer = () => {
  return (
    <>
      <Section
        children={
          <div className="glass-effect flex h-70 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-white/40 md:h-50 md:flex-row">
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
                    <Link
                      to="/"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/projects"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="contacts">
                <h3 className="mb-4 text-neutral-300">Let's Connect</h3>
                <ul className="flex flex-col font-light text-neutral-500">
                  <li>
                    <a
                      href="mailto:contact@maximiliano.dev"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      Email
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.linkedin.com/"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://github.com/"
                      className="hover:text-neutral-300 hover:underline"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

export default Footer
