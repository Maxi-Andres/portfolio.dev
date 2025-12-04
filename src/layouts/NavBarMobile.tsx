import { Link } from "react-router-dom"
import { useState, useRef, type MouseEvent } from "react"

const NavBarMobile = () => {
  const [hoverStyle, setHoverStyle] = useState({ 
    left: 0, 
    width: 0, 
    height: 0, 
    opacity: 0 
  })
  const navRef = useRef<HTMLUListElement>(null)

  const handleHover = (e: MouseEvent<HTMLAnchorElement>) => {
    const item = e.currentTarget
    const nav = navRef.current
    if (!nav) return

    const itemRect = item.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    setHoverStyle({
      left: itemRect.left - navRect.left - 0.8,
      width: itemRect.width,
      height: itemRect.height, 
      opacity: 1
    })
  }

  const handleLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  //! hacer dos nav es lo unico que se me ocurrio para que no te aparezca el cuadrado azul por el media query que luego no te deja interactuar con los botones

  return (
    <header className="fixed z-9999 w-[90%] bottom-4">
      <nav>
        <ul 
          ref={navRef} 
          className="relative grid grid-cols-4 border sm:border border-white/10 backdrop-blur-md sm:rounded-full shadow-lg bg-gray-600/10 rounded-2xl"
          onMouseLeave={handleLeave}
        >

          <div
            className="absolute top-0 bg-white/10 rounded-xl sm:rounded-full pointer-events-none transition-all duration-300"
            style={{
              left: hoverStyle.left,
              width: hoverStyle.width,
              height: hoverStyle.height,
              opacity: hoverStyle.opacity,
              transitionDelay: hoverStyle.opacity === 0 ? '0.2s' : '0s',
            }}
          />

          <Link to="/" 
            className="relative text-center py-5 sm:p-4 rounded-none sm:rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Home</Link>

          <Link to="/about" 
            className="relative text-center py-5 sm:p-4 rounded-none sm:rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >About</Link>

          <Link to="/projects" 
            className="relative text-center py-5 sm:p-4 rounded-none sm:rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Projects</Link>

          <a href="mailto:max.bianchimano@gmail.com" 
            className="relative text-center py-5 sm:p-4 rounded-none sm:rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Contact</a>

        </ul>
      </nav>
    </header>
  )
}

export default NavBarMobile