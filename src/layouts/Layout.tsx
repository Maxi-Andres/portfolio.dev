import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import NeonBackgroundEffect from "../components/NeonBackground"

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      <NeonBackgroundEffect/> {/*//? esto ponele un condicional */}
      <main className="min-h-screen w-full flex flex-col items-center justify-center lg:max-w-4xl lg:mx-auto 
        overflow-x-hidden lg:overflow-x-visible">
        <NavBar />
        <Outlet />
      </main>
    </div>
  )
}