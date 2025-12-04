import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const Links = () => {
  return (
    <>
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
    </>
  );
}

export default Links;
