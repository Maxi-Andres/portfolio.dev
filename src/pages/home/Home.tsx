import Header from "@/components/Header"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
// import TechStack from "@/components/TechStack"
import BentoSettings from "@/components/BentoSettings"
import Footer from "@/components/Footer"


const Home = () => {
  return (
    <>
      <Header/>

      <section className="border-t border-neutral-800 w-screen mb-10"></section>

      <Experience/>

      <Projects/>

      {/* <TechStack/> */}
      <BentoSettings/>

      <Footer/>

    </>
  )
}

export default Home