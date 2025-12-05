import Header from "@/components/home/Header"
import Experience from "@/components/home/Experience"
import Projects from "@/components/home/Projects"
// import TechStack from "@/components/TechStack"
import BentoSettings from "@/components/home/BentoSettings"
import Footer from "@/components/shared/Footer"


const Home = () => {
  return (
    <>
      <Header/>

      <section className="border-t border-white/20 w-screen mb-10"></section>

      <Experience/>

      <Projects/>

      <BentoSettings/>

      <Footer/>

    </>
  )
}

export default Home