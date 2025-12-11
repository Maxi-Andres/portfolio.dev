// components/shared/Section.tsx
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SectionProps {
  children: ReactNode
  title?: string
  viewMoreLink?: string
  viewMoreText?: string
  className?: string
  titleClassName?: string
}

const Section = ({
  children,
  title,
  viewMoreLink,
  viewMoreText = 'View More',
  className = '',
  titleClassName = '',
}: SectionProps) => {
  return (
    <div
      className={`z-10 flex w-full flex-col items-center px-10 py-10 sm:px-15 lg:px-0 ${className}`}
    >
      {title && (
        <div className="mb-6 flex w-full items-center justify-between">
          <h2
            className={`app-section-title text-2xl font-semibold lg:text-3xl ${titleClassName}`}
          >
            {title}
          </h2>
          {viewMoreLink && (
            <a
              href={viewMoreLink}
              target="_blank"
              className="app-view-more-link mt-2 text-lg hover:text-white lg:text-xl"
            >
              {viewMoreText}
            </a>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default Section
