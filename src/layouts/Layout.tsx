import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import NavBarMobile from "./NavBarMobile"
import NeonBackgroundEffect from "../components/backgrounds/NeonBackground"
import { useEffect, useState } from "react"

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
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      <NeonBackgroundEffect/> {/*//? esto ponele un condicional */}
      <main className="min-h-screen w-full flex flex-col items-center justify-center lg:max-w-4xl lg:mx-auto 
        overflow-x-hidden lg:overflow-x-visible">
        {isMobile ? <NavBarMobile /> : <NavBar />}
        <Outlet />
      </main>
    </div>
  )
}