import { type ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  noPadding?: boolean
}

const GlassCard = ({
  children,
  className = '',
  hover = true,
  onClick,
  noPadding = false,
}: GlassCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`glass-effect border-app break-inside-avoid rounded-2xl transition-all duration-300 ${
        hover ? 'border-hover-app' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${noPadding ? '' : 'p-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export default GlassCard

// lo de no padding es por las projects cards
