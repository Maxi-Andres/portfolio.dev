import { Link } from "react-router-dom"
import { BackgroundBeams } from "../components/ui/background-beams";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-10 px-5 sm:px-10 lg:px-0">

        <div className="backdrop-blur-md border border-neutral-800 rounded-2xl p-6 overflow-hidden 
        hover:border-neutral-600 transition-all duration-300 h-80 flex flex-col md:flex-row justify-between">

          <BackgroundBeams className="scale-[1.5] translate-y-[-5%]" />

          <div className="logo flex flex-col justify-end mb-6 md:mb-0">
            <p className="text-4xl">
              Maximiliano Andres.</p>
          </div>

          <div className="flex flex-row space-x-12">

            <div className="menu mb-6 md:mb-0">
              <h3 className="text-neutral-300 mb-4">Explore</h3>
              <ul className="flex flex-col text-neutral-500 font-light">
                <li>
                  <Link to="/" className="hover:underline hover:text-neutral-300">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline hover:text-neutral-300">About</Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:underline hover:text-neutral-300">Projects</Link>
                </li>
              </ul>
            </div>

            <div className="contacts">
              <h3 className="text-neutral-300 mb-4">Let's Connect</h3>
              <ul className="flex flex-col text-neutral-500 font-light">
                <li>
                  <a href="mailto:contact@maximiliano.dev"
                    className="hover:underline hover:text-neutral-300">
                    Email
                  </a>
                </li>

                <li>
                  <a href="https://www.linkedin.com/"
                    className="hover:underline hover:text-neutral-300" >
                    LinkedIn
                  </a>
                </li>

                <li>
                  <a href="https://github.com/"
                    className="hover:underline hover:text-neutral-300">
                    GitHub
                  </a>
                </li>

              </ul>
            </div>

          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer
