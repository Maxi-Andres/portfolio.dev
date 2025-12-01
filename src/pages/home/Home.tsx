import TechStack from "@/components/TechStack"
import Experience from "../../components/Experience"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Projects from "../../components/Projects"


const Home = () => {
  return (
    <>
      <Header/>

      <section className="border-t border-neutral-800 w-screen mb-10"></section>
      <div>
        <div className="header-bg-elipse-1 absolute -left-50 translate-y-[-40%]"></div>
      </div>

      <Experience/>

      <div>
        <div className="header-bg-elipse-2 absolute -right-80 translate-y-[-60%]"></div>
      </div>

      <div>
        <div className="header-bg-elipse-3 absolute -right-60 -translate-y-[-110%]"></div>
        <div className="header-bg-elipse-3 absolute -left-50 -translate-y-[-130%]"></div>
      </div>

      <Projects/>

      <TechStack/>

      <Footer/>

      <div>
        <div className="header-bg-elipse-1 absolute -right-40 translate-y-[-80%]"></div>
        <div className="header-bg-elipse-2 absolute -left-110 translate-y-[-90%]"></div>
      </div>

    </>
  )
}

export default Home