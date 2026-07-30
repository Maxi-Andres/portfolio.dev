import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconFileDownload,
} from '@tabler/icons-react'
// El CV se importa como asset para que Vite le aplique el base path
// (/portfolio.dev/) automaticamente y no se rompa en produccion.
import cvUrl from '@/assets/docs/Curriculum_Vitae.pdf?url'

const Links = () => {
  return (
    <>
      <a
        href="https://www.linkedin.com/in/maximiliano-andres-bianchimano/"
        target="_blank"
        className="rounded-full"
      >
        <button className="glass-effect glass-effect bg-selected-btn border-selected-app flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-300 hover:scale-105">
          <IconBrandLinkedin stroke={1.5} className="app-text-color" />
        </button>
      </a>
      <a
        href="https://github.com/Maxi-Andres"
        target="_blank"
        className="rounded-full"
      >
        <button className="glass-effect glass-effect bg-selected-btn border-selected-app flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-300 hover:scale-105">
          <IconBrandGithub stroke={1.5} className="app-text-color" />
        </button>
      </a>
      <a
        href={cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open CV in a new tab"
        className="rounded-full"
      >
        <button className="glass-effect glass-effect bg-selected-btn border-selected-app flex cursor-pointer items-center gap-2 rounded-full border p-2 text-sm font-medium duration-300 hover:scale-105">
          <IconFileDownload stroke={1.5} className="app-text-color" />
        </button>
      </a>
    </>
  )
}
// en el todo lo que se puede hacer es que te lo descargue o que lo abra en una pestaña para ver o podes poner las dos
export default Links
