import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/home/Home'
import About from '../pages/about/About'

export const AppRouter = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

{/* las rutas en el path pueden tener cualquier cosa */}