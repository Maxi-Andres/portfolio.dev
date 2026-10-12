import ProjectCard from './ProjectCard'
import Section from '../shared/SectionContainer'
import neuralImg from '@/assets/img/neural_network.png'
import openGlImg from '@/assets/img/opengl.png'
import pedirIMmg from '@/assets/img/algo_que_pedir.png'
import spaceImg from '@/assets/img/space_invaders.png'
import Silk from '@/assets/img/silk_tech.png'
import solarImg from '@/assets/img/solar_system.png'
import musicImg from '@/assets/img/music_player.png'
import bookLibreImg from '@/assets/img/booklibre.png'

const Projects = () => {
  const projects = [
    {
      title: 'Unitree G1 — Vision AI',
      description:
        'Real-time vision AI for the Unitree G1 humanoid. A phone streams live video to a gateway, where YOLO and a vision-language model running locally on Ollama detect and describe industrial equipment.',
      tags: ['Python', 'YOLO', 'Ollama', 'React', 'Unitree G1'],
      link: 'https://github.com/Maxi-Andres/AI-VL-ecosystem',
    },
    {
      title: 'Unitree Go2 — Robot Operations',
      description:
        "Software that runs on the Go2's onboard computer so it can be operated from anywhere: telemetry to Splunk, a safety-first command relay (auth, speed clamp, dead-man switch) and a low-latency camera pipeline with NVR recording.",
      tags: ['Python', 'DDS', 'Splunk', 'Unitree Go2'],
      link: 'https://github.com/Maxi-Andres/robot-ecosystem',
    },
    {
      image: solarImg,
      title: 'Solar System Simulator',
      description:
        'A real-time, to-scale simulation of the Solar System built on NASA/JPL ephemerides: real distances, sizes, rotations and orbits, with time controls and free camera navigation.',
      tags: ['TypeScript', 'React', 'Three.js', 'NASA/JPL Data'],
      link: 'https://maxi-andres.github.io/Solar-System-Simulator/',
    },
    {
      image: musicImg,
      title: 'Music Player for Android',
      description:
        'An Android music player for local files: folder browsing, queue, equalizer, lock-screen and notification controls, and automatic updates from GitHub Releases.',
      tags: ['Kotlin', 'Jetpack Compose', 'Media3', 'Android'],
      link: 'https://github.com/Maxi-Andres/music-player',
    },
    {
      image: bookLibreImg,
      title: 'BookLibre',
      description:
        'A book-lending platform built by a team of five: a Kotlin and Spring Boot API (REST and GraphQL) with role-based JWT auth, PostgreSQL, MongoDB and Redis caching, and a React frontend with catalog search, a reservation calendar and an admin dashboard.',
      tags: ['Kotlin', 'Spring Boot', 'React', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      link: 'https://github.com/Maxi-Andres/booklibre-backend',
    },
    {
      image: neuralImg,
      title: 'Neural Network for Digit Recognition',
      description:
        'A neural network built from scratch with NumPy, with hand-written backpropagation, that classifies handwritten MNIST digits with 96.96% test accuracy.',
      tags: ['Python', 'NumPy', 'Machine Learning', 'MNIST'],
      link: 'https://github.com/Maxi-Andres/Neural-Network',
    },
    {
      image: openGlImg,
      title: '3D Renderer with OpenGL',
      description:
        'Modern OpenGL (3.3 core) in C++, following LearnOpenGL: shaders, textures, transformations, a free-moving camera and Phong lighting with lighting maps, wrapped in my own C++ abstractions.',
      tags: ['C++', 'OOP', 'OpenGL', 'Shaders', '3D Graphics'],
      link: 'https://github.com/Maxi-Andres/OpenGL',
    },
    {
      image: pedirIMmg,
      title: 'Food Delivery Platform',
      description:
        'A food ordering platform in the style of PedidosYa: a Kotlin and Spring Boot REST API, a React app where customers browse restaurants and order, and a Svelte app where restaurants manage orders, menus and ingredients.',
      tags: ['Svelte', 'React', 'Kotlin', 'Spring Boot', 'TypeScript'],
      link: 'https://github.com/Maxi-Andres/algo-que-pedir-local',
    },
    {
      image: spaceImg,
      title: 'Space Invaders',
      description:
        'The classic arcade game written entirely in 16-bit x86 Assembly for DOS: four levels, a mystery ship, a final boss, and custom interrupt handlers for sound and random numbers.',
      tags: ['Assembly', 'x86', '16 bits', 'Low-Level'],
      link: 'https://github.com/Maxi-Andres/Space-Invaders',
    },
    {
      image: Silk,
      title: 'Silk Technologies — Corporate Website',
      description:
        'Full-stack corporate website developed for Silk Tech srl. Covers UI/UX design, frontend implementation, backend and database setup — delivered as a complete production-ready product.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Full Stack'],
      link: 'https://silk-technologies.com/',
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
