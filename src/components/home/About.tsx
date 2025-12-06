import Section from '@/components/shared/SectionContainer'

const About = () => {
  return (
    <>
      <Section
        title="About Me"
        children={
          <div className="flex flex-col items-start gap-10 px-4">
            <div className="border-app-l glass-effect w-full space-y-4 rounded-r-2xl leading-relaxed text-neutral-300">
              <div className="px-6 py-4">
                <p>
                  Hey! I'm{' '}
                  <span className="font-semibold text-white">
                    Maximiliano Andres
                  </span>
                  , a programmer and network engineer from Buenos Aires,
                  Argentina. I'm passionate about everything related to
                  hardware, software, and networking, and I love continuously
                  learning, improving, and exploring new technologies.
                </p>

                <p>
                  In my free time, I enjoy building personal projects of all
                  kinds — from low-level programming in C and assembly, to
                  creating artificial intelligences, developing websites, and
                  even designing small video games. Anything that challenges my
                  mind and lets me create something new is always welcome.
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
