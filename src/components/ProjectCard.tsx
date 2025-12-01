
type ProjectCardProps = {
  image: string
  title: string
  description: string
  tags: string[]
  link: string
}

const ProjectCard = ({ image, title, description, tags, link }: ProjectCardProps) => {

  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative backdrop-blur-md border border-neutral-800 rounded-2xl overflow-hidden 
        hover:border-neutral-600 transition-all duration-300"
    >

        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>

          <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
    </a>
  )
}

export default ProjectCard