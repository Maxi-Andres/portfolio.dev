type TechItemProps = {
  icon?: string
  title: string
  children?: React.ReactNode
  href?: string
}

const TechItem = ({ title, icon, children, href }: TechItemProps) => {
  const content = (
    <div className="relative group/item">
      <div
        className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-2xl 
        hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {children ? children : icon}
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity 
        duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-[#1e1e2e]/90 backdrop-blur-md border border-neutral-700 rounded-lg px-3 py-1.5">
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