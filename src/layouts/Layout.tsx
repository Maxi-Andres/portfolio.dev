import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export const MainLayout = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <NavBar />
      <Outlet />
    </main>
  )
}
