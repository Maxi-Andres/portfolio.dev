import ProjectCard from './ProjectCard'
import Section from '../shared/SectionContainer'

const Projects = () => {
  const projects = [
    {
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      title: 'Portfolio Website',
      description:
        'A modern portfolio showcasing projects and skills with smooth animations and responsive design.',
      tags: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
      link: '#',
    },
    {
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      title: 'Task Manager Pro',
      description:
        'A comprehensive task management application with real-time collaboration features.',
      tags: ['TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
      link: '',
    },
  ]

  return (
    <>
      <Section
        title="Featured Projects"
        viewMoreLink="https://github.com/Maxi-Andres"
        children={
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        }
      />
    </>
  )
}

export default Projects
