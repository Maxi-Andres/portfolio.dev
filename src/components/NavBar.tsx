import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <header className="fixed left-1/2 top-10 z-999 -translate-x-1/2 w-full md:w-auto">
      <nav className="relative animate-jump-in animate-once animate-duration-1000">
        <ul className="relative grid grid-cols-4 items-center justify-center py-2 border border-white/10 
        backdrop-blur-md rounded-full shadow-lg transition-all duration-200 ease-in-out mx-2 md:mx-0">

          <Link to="/" className="relative z-10 px-2 md:px-4 text-center py-2 rounded-full cursor-pointer transition-colors 
          duration-300 text-neutral-300">Home</Link>

          <Link to="/about" className="relative z-10 px-2 md:px-4 text-center py-2 rounded-full cursor-pointer transition-colors 
          duration-300 text-neutral-300">About</Link>

          <Link to="/projects" className="relative z-10 px-2 md:px-4 text-center py-2 rounded-full cursor-pointer transition-colors 
          duration-300 text-neutral-300">Projects</Link>
{/* hacer los links componentes */}
          <a href="mailto:max.bianchimano@gmail.com" className="relative z-10 px-2 md:px-4 text-center py-2 rounded-full cursor-pointer transition-colors duration-300 text-neutral-300">Contact</a>

        <div className="absolute top-0 h-full w-1/4 bg-white/10 rounded-full transition-all duration-300 opacity-0 opacity-0 left-0"></div>
        </ul>
      </nav>
    </header>
  )
}
{/* importante usar Link para que sea single page aplication */}
export default NavBar