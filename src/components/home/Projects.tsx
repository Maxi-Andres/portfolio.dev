import ProjectCard from './ProjectCard'
import Section from '../shared/SectionContainer'

const Projects = () => {
  const projects = [
    {
      image: '/img/neural_network.png',
      title: 'Neural Network for Digit Recognition',
      description:
        'A deep learning model built from scratch using NumPy to classify handwritten digits from the MNIST dataset. Features a 3-layer architecture and achieves 96.97% test accuracy.',
      tags: ['Python', 'NumPy', 'Machine Learning', 'MNIST'],
      link: 'https://github.com/Maxi-Andres/Neural-Network',
    },
    {
      image: '/img/algo_que_pedir.png',
      title: 'Food Delivery Platform',
      description:
        'A full-stack food ordering application with dual interfaces: Svelte for restaurant management and React for customer orders. Features real-time menu updates and order tracking.',
      tags: ['Svelte', 'React', 'Kotlin', 'Spring Boot', 'TypeScript'],
      link: 'https://github.com/Maxi-Andres/algo-que-pedir-local',
    },
    {
      image: '/img/space_invaders.png',
      title: 'Space Invaders',
      description:
        'A recreation of the classic arcade game written entirely in x86 Assembly. Features progressive difficulty levels, multiple enemy types, a final boss battle, sound effects and animations.',
      tags: ['Assembly', 'x86', '16 bits', 'Low-Level'],
      link: 'https://github.com/Maxi-Andres/TP-Assembly',
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
