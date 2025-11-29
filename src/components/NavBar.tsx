import { Link } from "react-router-dom"
import { useState, useRef, type MouseEvent } from "react"

const NavBar = () => {
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
    if (!nav) return // esto es para que no rompa las bolas lo de abajo

    const itemRect = item.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    setHoverStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      height: itemRect.height, 
      opacity: 1
    })
  }

  const handleLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <header className="fixed top-10 z-999">
      <nav>
        <ul 
          ref={navRef} 
          className="relative grid grid-cols-4 border border-white/10 backdrop-blur-md rounded-full shadow-lg"
          onMouseLeave={handleLeave}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 h-8 bg-white/10 rounded-full duration-300 pointer-events-none"
            style={{
              left: hoverStyle.left,
              width: hoverStyle.width,
              height: hoverStyle.height,
              opacity: hoverStyle.opacity,
            }}
          />

          <Link to="/" 
            className="text-center py-4 px-4 rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Home</Link>

          <Link to="/about" 
            className="text-center py-4 px-4 rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >About</Link>

          <Link  to="/projects" 
            className="text-center py-4 px-4 rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Projects</Link>

          <a href="mailto:max.bianchimano@gmail.com" 
            className="text-center py-4 px-4 rounded-full text-neutral-300 hover:text-white transition-colors duration-300"
            onMouseEnter={handleHover}
          >Contact</a>

        </ul>
      </nav>
    </header>
  )
}

export default NavBar