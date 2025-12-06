import Header from '@/components/home/Header'
import Experience from '@/components/home/Experience'
import Projects from '@/components/home/Projects'
import BentoSettings from '@/components/home/BentoSettings'
import Footer from '@/components/home/Footer'
import TechStack from '@/components/home/TechStack'
import About from '../../components/home/About'

const Home = () => {
  return (
    <>
      <section id="home" />
      <Header />

      <section className="border-app-t mb-10 w-screen"></section>

      <Experience />

      <section id="projects" />
      <Projects />

      <BentoSettings />

      <section id="about" />
      <About />

      <TechStack />

      <Footer />
    </>
  )
}

export default Home
