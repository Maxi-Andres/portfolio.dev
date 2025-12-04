import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import NavBarMobile from "./NavBarMobile"
import { useEffect, useState, useRef } from "react"
import { MainBackground } from "./background"
import { IconVolumeOff } from '@tabler/icons-react';
import { IconVolume } from '@tabler/icons-react';

export const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05
    }
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.error("Error al intentar reproducir el audio:", error)
            setIsPlaying(false) 
          })
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      <MainBackground />
      
      <audio ref={audioRef} loop>
        <source src="/music/Comet Observatory 3 - Super Mario Galaxy Music - Extended.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
      >
        {isPlaying ? <IconVolume stroke={1.5} /> : <IconVolumeOff stroke={1.5} />}
      </button>

      <main className="min-h-screen w-full flex flex-col items-center justify-center lg:max-w-4xl lg:mx-auto 
        overflow-x-hidden lg:overflow-x-visible">
        {isMobile ? <NavBarMobile /> : <NavBar />}
        <Outlet />
        {/*//? esto es por el nav en mobile  */}
        <div className="mb-20"></div> 
      </main>
    </div>
  )
}