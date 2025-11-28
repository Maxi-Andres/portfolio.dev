import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import About from '../pages/about/About'
import Project from '../pages/project/Project'
import {MainLayout} from '../layouts/Layout'

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
        </Route>
      </Routes>
    </div>
  )
}

{/* las rutas en el path pueden tener cualquier cosa */}