import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainBackground } from './background'

import NavBar from './NavBar.tsx'

export const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
      <MainBackground />
      <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden lg:mx-auto lg:max-w-4xl lg:overflow-x-visible">
        {isMobile ? <NavBar variant="mobile" /> : <NavBar variant="desktop" />}
        <Outlet />
        {/*//? esto es por el nav en mobile  */}
        <div className="mb-20"></div>
      </main>
    </div>
  )
}
