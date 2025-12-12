import GlassCard from '../shared/GlassCard'

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
    <a href={link} target="_blank" rel="noopener noreferrer" className="group">
      <GlassCard noPadding className="relative overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
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
                className="border-app glass-effect bg-selected-btn rounded-full px-3 py-1 text-xs text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </a>
  )
}

export default ProjectCard
