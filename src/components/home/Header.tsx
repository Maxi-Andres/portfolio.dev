import { IconSend } from '@tabler/icons-react'
import Links from '../shared/Links'

const Header = () => {
  return (
    <>
      <div className="px-4 py-40 md:py-60">
        <main className="flex max-w-4xl flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="app-text-color text-2xl font-semibold">
              Hey! I'm Max
            </h2>
            <h1 className="app-text-color text-4xl font-semibold md:text-6xl lg:text-7xl">
              Software Developer &
            </h1>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <h1 className="app-text-color mb-2 text-4xl font-semibold md:mb-5.5 md:text-6xl lg:text-7xl">
              Network Engineer
            </h1>

            <a href="mailto:max.bianchimano@gmail.com" className="rounded-full">
              <button className="glass-effect bg-selected-btn border-selected-app mb-3.5 flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium duration-300 hover:scale-105 md:mb-0">
                <IconSend stroke={2} size={18} className="app-text-color" />
                <span className="app-text-color">Contact me</span>
              </button>
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <Links />
          </div>
          {/*//? esto es para ir haciendo los modos */}
          {/* <button
            className="Z-100000 app-text-color fixed top-0.5 left-0.5 cursor-pointer border p-3"
            onClick={() => document.documentElement.classList.toggle('dark')}
          >
            Light: text tiene que estar black
            <br></br>
            Dark: text tiene que estar white
          </button> */}
        </main>
      </div>
    </>
  )
}

export default Header
