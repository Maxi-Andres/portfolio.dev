import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="w-full py-10">
        <div className="border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between">
          
          <div className="logo flex flex-col justify-end mb-6 md:mb-0">
            <p className="text-4xl">
              Maximiliano<br />
              Andres.
            </p>
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
                  <a
                    href="mailto:contact@maximiliano.dev"
                    className="hover:underline hover:text-neutral-300"
                    >
                    Email
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/"
                    className="hover:underline hover:text-neutral-300"
                    >
                    LinkedIn
                  </a>
                </li>

                <li>
                  <a
                    href="https://github.com/"
                    className="hover:underline hover:text-neutral-300"
                    >
                    GitHub
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="hover:underline hover:text-neutral-300"
                    >
                    Instagram
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
