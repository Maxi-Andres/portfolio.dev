import { Link } from "react-router-dom"
import ProjectCard from "../components/ProjectCard"

const Projects = () => {

  const projects = [
  // {
  //   image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  //   title: "Campus Maps",
  //   description: "An interactive app that helps students navigate and explore the university campus.",
  //   tags: ["Next.JS", "Tailwindcss", "MapLibre", "Express.js", "MySQL"],
  //   link: "#"
  // },
  // {
  //   image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80",
  //   title: "Atelier do Doce",
  //   description: "An e-commerce site designed for a pastry shop, where customers can explore and order sweet products.",
  //   tags: ["Wordpress", "Elementor", "WooCommerce"],
  //   link: "#"
  // },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    title: "Portfolio Website",
    description: "A modern portfolio showcasing projects and skills with smooth animations and responsive design.",
    tags: ["React", "Tailwind", "Framer Motion", "Vite"],
    link: "#"
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    title: "Task Manager Pro",
    description: "A comprehensive task management application with real-time collaboration features.",
    tags: ["TypeScript", "Node.js", "MongoDB", "Socket.io"],
    link: "#"
  }
]

  return (
    <>
      <div className="flex py-10 flex-col items-center w-full">

        <div className="flex items-center w-full mb-6 justify-between">
          <h2 className="text-3xl font-semibold text-neutral-400"> Featured Projects</h2>
          <Link to="/projects" className="text-xl text-neutral-400 mt-2 hover:text-white">View More</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

      </div>
    </>
  )
}

export default Projects
