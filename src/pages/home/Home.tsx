import Header from '@/components/home/Header'
import Experience from '@/components/home/Experience'
import Projects from '@/components/home/Projects'
import BentoSettings from '@/components/home/BentoSettings'
import Footer from '@/components/shared/Footer'
import TechStack from '@/components/about/TechStack'
import About from '../about/About'

const Home = () => {
  return (
    <>
      <Header />

      <section className="border-app-t mb-10 w-screen"></section>

      <Experience />

      <Projects />

      <BentoSettings />

      <About />

      <TechStack />

      <Footer />
    </>
  )
}

export default Home
