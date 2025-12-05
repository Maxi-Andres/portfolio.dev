import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileDownload,
} from '@tabler/icons-react'

const Links = () => {
  return (
    <>
      <a
        href="https://www.linkedin.com/in/maximiliano-andres-bianchimano/"
        target="_blank"
        className="rounded-full hover:bg-white/10"
      >
        <button className="glass-effect flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-500 hover:scale-105">
          <IconBrandLinkedin stroke={1.5} />
        </button>
      </a>
      <a
        href="https://github.com/Maxi-Andres"
        target="_blank"
        className="rounded-full hover:bg-white/10"
      >
        <button className="glass-effect flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-500 hover:scale-105">
          <IconBrandGithub stroke={1.5} />
        </button>
      </a>
      <a
        href="https://github.com/Maxi-Andres"
        target="_blank"
        className="rounded-full hover:bg-white/10"
      >
        <button className="glass-effect flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-500 hover:scale-105">
          <IconFileDownload stroke={1.5} />
          to do!
        </button>
      </a>
    </>
  )
}

export default Links
