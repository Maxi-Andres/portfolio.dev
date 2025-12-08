type TechItemProps = {
  icon?: string
  title: string
  children?: React.ReactNode
  href?: string
}

const TechItem = ({ title, icon, children, href }: TechItemProps) => {
  const content = (
    <div className="group/item relative">
      <div className="glass-effect bg-techitem-hover bg-techitem flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-2xl transition-all duration-300 hover:-translate-y-1">
        {children ? children : icon}
      </div>

      {/* Tooltip */}
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
        <div className="border-selected-app rounded-lg bg-[#1c1c1c]/96 px-3 py-1.5 backdrop-blur-lg">
          <span className="text-sm text-white">{title}</span>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

export default TechItem
