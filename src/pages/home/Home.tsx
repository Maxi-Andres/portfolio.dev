import { IconSend } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconBrandLinkedin } from '@tabler/icons-react';
// import { IconFileDownload } from '@tabler/icons-react';

const Home = () => {
  return (
    <>
      <div className="py-60 px-4">
        <main className="max-w-4xl"> 

          <div className="relative -z-100"> {/*//? esto para que se ponga atras de todo */}
            <div className="header-bg-elipse-1 absolute left-0 top-0 translate-x-[66%]"></div>
            <div className="header-bg-elipse-2 absolute left-0 top-0"></div>
            <div className="header-bg-elipse-3 absolute right-0 top-0 translate-x-[-66%]"></div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">Hey! I'm Max</h2>
            <h1 className="text-7xl font-semibold">Software Developer &</h1>
          </div>

          <div className="flex items-center gap-4">
            <h1 className="text-7xl font-semibold mb-4.5">Network Engineer</h1>
            {/*//? le pongo el margin porque no lo centra bien */}
            <a href="mailto:max.bianchimano@gmail.com" className='rounded-full'>
              <button 
                className="flex items-center gap-2 text-sm font-medium border px-4 py-2.5 
                rounded-full duration-500 hover:scale-105 cursor-pointer hover:bg-white/10">
                  {/*//? ver si pongo tipo glow */}
                <IconSend stroke={2} size={18} />
                <span>Contact me</span>
              </button>
            </a>
          </div>

          <div className='flex justify-center gap-4'>
            <a href="https://www.linkedin.com/in/maximiliano-andres-bianchimano/" target='_blank' className='full-rounded'>
              <button className="flex items-center gap-2 text-sm font-medium border p-2
                rounded-full duration-500 hover:scale-105 cursor-pointer hover:bg-white/10">
                <IconBrandLinkedin stroke={1.5} />
              </button>
            </a>
            <a href="https://github.com/Maxi-Andres" target='_blank' className='full-rounded'>
              <button className="flex items-center gap-2 text-sm font-medium border p-2
                rounded-full duration-500 hover:scale-105 cursor-pointer hover:bg-white/10">
                <IconBrandGithub stroke={1.5} />
              </button>
            </a>
            <a href="https://github.com/Maxi-Andres" target='_blank' className='full-rounded'>
              <button className="flex items-center gap-2 text-sm font-medium border p-2
                rounded-full duration-500 hover:scale-105 cursor-pointer hover:bg-white/10">
                {/* <IconFileDownload stroke={1.5} /> */}
                !completar
              </button>
            </a>
          </div>

        </main>
      </div>

      <section className="border-t border-neutral-800 w-full mb-20"></section>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dignissimos expedita, perferendis officia repudiandae nam molestiae maxime cumque quas dicta earum doloremque deleniti assumenda aut ipsam a, debitis iste iusto!</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda facilis quasi, excepturi nulla obcaecati aliquid deserunt quaerat. Quasi vero commodi delectus laboriosam facere illo error nemo ullam pariatur fugiat?</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum illo atque facere blanditiis! Distinctio explicabo, eum quam blanditiis assumenda dicta corporis magni necessitatibus ipsum eius eos ea reiciendis impedit sapiente.</span>
      </div>

      <div className='p-15'>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem voluptatibus veritatis cumque omnis ad unde, minus, deleniti voluptatum inventore quidem pariatur ratione maiores, eligendi excepturi hic ut placeat officiis odit!</span>
      </div>

    </>
  )
}

export default Home