import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export const MainLayout = () => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center lg:max-w-4xl lg:mx-auto overflow-x-hidden lg:overflow-x-visible">
      <NavBar />
      <Outlet />
    </main>
  )
}