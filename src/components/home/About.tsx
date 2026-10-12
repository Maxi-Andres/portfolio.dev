import Section from '@/components/shared/SectionContainer'

const About = () => {
  return (
    <>
      <Section
        title="About Me"
        children={
          <div className="flex flex-col items-start gap-10 px-4">
            <div className="border-app-l glass-effect app-text-body w-full space-y-4 rounded-r-2xl leading-relaxed">
              <div className="px-6 py-4">
                <p>
                  Hey! I'm{' '}
                  <span className="app-text-color font-semibold">
                    Maximiliano Andres
                  </span>
                  , a network engineer and programmer from Buenos Aires,
                  Argentina. At Silk Technologies I work on our clients'
                  networks and also develop software, which these days means
                  robotics and AI for Unitree robots. I'm CCNA certified,
                  preparing for the CCNP, and studying Telecommunications
                  Engineering.
                </p>

                <p>
                  I'm passionate about everything related to hardware,
                  software, and networking. In my free time I build personal
                  projects of all kinds: from low-level programming in C and
                  Assembly to neural networks, robotics, websites, Android apps
                  and small video games. Anything that challenges my mind and
                  lets me create something new is always welcome.
                </p>

                <p>
                  Outside of technology, I enjoy riding my bike, going to the
                  gym, cooking, and spending time with friends. Feel free to
                  contact me anytime!
                </p>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

export default About
