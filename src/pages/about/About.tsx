import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import Links from '../../components/links';

const About = () => {
  return (
    <>
      <div className="py-30 pb-4 md:py-45 md:pb-6 ">
        <main className="max-w-4xl flex flex-col justify-center items-center w-full py-10 px-5 sm:px-10 lg:px-0"> 

          <h1 className="text-4xl font-bold text-white mb-4.5">About Me</h1>

          <div className="flex flex-col md:flex-row gap-10 items-start">

            <div className="w-full text-neutral-300 leading-relaxed space-y-4">

              <p>
                Hey! I'm <span className="font-semibold text-white">Maximiliano Andres</span>, 
                a programmer and network engineer from Buenos Aires, Argentina. I'm passionate 
                about everything related to hardware, software, and networking, and I love 
                continuously learning, improving, and exploring new technologies.
              </p>

              <p>
                In my free time, I enjoy building personal projects of all kinds — from 
                low-level programming in C and assembly, to creating artificial 
                intelligences, developing websites, and even designing small video games. 
                Anything that challenges my mind and lets me create something new is 
                always welcome.
              </p>

              <p>
                Outside of technology, I enjoy riding my bike, going to the gym, cooking, 
                and spending time with friends. Feel free to contact me anytime!
              </p>

              <div className='flex gap-4 pt-2'>
                <Links />
              </div>
            </div>

          </div>

        </main>
      </div>

      <section className="border-t border-neutral-800 w-screen mb-10"></section>

      <TechStack />
      <Footer />
    </>
  );
}

export default About;
