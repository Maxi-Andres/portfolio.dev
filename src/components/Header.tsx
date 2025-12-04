import { IconSend } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconBrandLinkedin } from '@tabler/icons-react';
// import { IconFileDownload } from '@tabler/icons-react';


const Header = () => {
  return (
    <>
      <div className="py-40 md:py-60 px-4 ">
        <main className="max-w-4xl flex flex-col justify-center items-center"> 

          <div className="text-center">
            <h2 className="text-2xl font-semibold">Hey! I'm Max</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold">Software Developer &</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-2 md:mb-4.5">Network Engineer</h1>
            
            <a href="mailto:max.bianchimano@gmail.com" className='rounded-full'>
              <button 
                className="flex items-center gap-2 text-sm font-medium border px-4 py-2.5 
                rounded-full duration-500 hover:scale-105 cursor-pointer hover:bg-white/10 mb-3.5 md:mb-0">
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
    </>
  )
}

export default Header