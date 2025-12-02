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

      {/* azul arriba izquierda */}
      <div>
        <div className="-z-10 header-bg-elipse-1 absolute -left-70 translate-y-[-40%]"></div>
      </div>

      <Experience/>

      {/* cyan y violeta derecha medio */}
      <div>
        <div className="-z-10 header-bg-elipse-2 absolute -right-90 translate-y-[-60%]"></div>
        <div className="-z-10 header-bg-elipse-3 absolute -right-70 -translate-y-[-110%]"></div>
      </div>

      {/* violeta izquierda medio */}
      <div>
        <div className="-z-10 header-bg-elipse-3 absolute -left-80 -translate-y-[-10%]"></div>
      </div>

      <Projects/>

      {/* <TechStack/> */}
      <BentoSettings/>

      {/* azul cyan izquierda medio abajo */}
      <div>
        <div className="-z-10 header-bg-elipse-1 absolute -left-90 translate-y-[-330%]"></div>
        <div className="-z-10 header-bg-elipse-2 absolute -left-120 -translate-y-[170%]"></div>
      </div>

      {/* violeta derecha medio abajo */}
      <div>
        <div className="-z-10 header-bg-elipse-3 absolute -right-80 -translate-y-[200%]"></div>
      </div>

      <Footer/>

      {/* azul cyan izquierda abajo */}
      <div>
        <div className="-z-10 header-bg-elipse-2 absolute -right-110 translate-y-[-90%]"></div>
        <div className="-z-10 header-bg-elipse-1 absolute -left-110 translate-y-[-90%]"></div>
      </div>

    </>
  )
}

export default Home