import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import NavBarMobile from "./NavBarMobile"
// import NeonBackgroundEffect from "../components/backgrounds/NeonBackground"
import LightPillar from "@/components/backgrounds/LightPillar"
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
      {/*//? esto ponele un condicional */}
      {/* <NeonBackgroundEffect/>  */}
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={3}
          rotationSpeed={0.2}
          glowAmount={0.001}
          pillarWidth={8.3}
          pillarHeight={1.6}
          noiseIntensity={1.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="normal"
        />
      <main className="min-h-screen w-full flex flex-col items-center justify-center lg:max-w-4xl lg:mx-auto 
        overflow-x-hidden lg:overflow-x-visible">
        {isMobile ? <NavBarMobile /> : <NavBar />}
        <Outlet />
      </main>
    </div>
  )
}