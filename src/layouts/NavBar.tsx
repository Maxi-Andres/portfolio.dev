import { useState, useRef, type MouseEvent } from 'react'

interface NavBarProps {
  variant?: 'desktop' | 'mobile'
}

const NavBar = ({ variant = 'desktop' }: NavBarProps) => {
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  })

  const navRef = useRef<HTMLUListElement>(null)

  const navItemClasses =
    'text-center relative text-neutral-300 hover:text-white transition-colors duration-300 py-5 sm:p-4 rounded-none sm:rounded-full cursor-pointer'
  const hoverElementClasses =
    'absolute top-0 pointer-events-none transition-all duration-300 bg-selected-btn rounded-xl sm:rounded-full'

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    {
      id: 'contact',
      label: 'Contact',
      isExternal: true,
      href: 'mailto:max.bianchimano@gmail.com',
    },
  ]

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
      opacity: 1,
    })
  }

  const handleLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // config segun variant para no repetir porque si no con el media query lo rompe
  const headerClasses =
    variant === 'mobile'
      ? 'fixed bottom-4 z-9999 w-[90%]'
      : 'fixed top-10 z-9999 w-auto'

  return (
    <header className={headerClasses}>
      <nav>
        <ul
          ref={navRef}
          className="glass-effect border-app relative grid grid-cols-4 rounded-2xl shadow-lg sm:rounded-full"
          onMouseLeave={handleLeave}
        >
          <div
            className={hoverElementClasses}
            style={{
              left: hoverStyle.left,
              width: hoverStyle.width,
              height: hoverStyle.height,
              opacity: hoverStyle.opacity,
              transitionDelay: hoverStyle.opacity === 0 ? '0.2s' : '0s',
            }}
          />

          {navItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.label}
                href={item.href}
                className={navItemClasses}
                onMouseEnter={handleHover}
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className={navItemClasses}
                onMouseEnter={handleHover}
              >
                {item.label}
              </a>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
