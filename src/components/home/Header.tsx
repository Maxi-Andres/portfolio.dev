import { IconSend } from '@tabler/icons-react'
import Links from '../shared/links'

const Header = () => {
  return (
    <>
      <div className="px-4 py-40 md:py-60">
        <main className="flex max-w-4xl flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Hey! I'm Max</h2>
            <h1 className="text-4xl font-semibold md:text-6xl lg:text-7xl">
              Software Developer &
            </h1>
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <h1 className="mb-2 text-4xl font-semibold md:mb-5.5 md:text-6xl lg:text-7xl">
              Network Engineer
            </h1>

            <a
              href="mailto:max.bianchimano@gmail.com"
              className="rounded-full hover:bg-white/10"
            >
              <button className="glass-effect mb-3.5 flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium duration-500 hover:scale-105 md:mb-0">
                <IconSend stroke={2} size={18} />
                <span>Contact me</span>
              </button>
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <Links />
          </div>
        </main>
      </div>
    </>
  )
}

export default Header
