type ProjectCardProps = {
  image: string
  title: string
  description: string
  tags: string[]
  link: string
}

const ProjectCard = ({
  image,
  title,
  description,
  tags,
  link,
}: ProjectCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-effect relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/40"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="border-app rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300"
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
