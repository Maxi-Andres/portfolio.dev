import { IconExternalLink } from '@tabler/icons-react'
import { AnimatePresence, motion, type Variants } from 'motion/react'

type ExperienceInfoProps = {
  active: 'work' | 'studies'
}

type Entry = {
  period: string
  institution: string
  position: string
  description: string
  link?: { href: string; label: string }
}

// Transicion sutil al cambiar entre Work / Studies: fade + leve
// desplazamiento, con un stagger corto entre cada entrada.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.2, staggerChildren: 0.06 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

const ExperienceInfo = ({ active }: ExperienceInfoProps) => {
  const workExperience: Entry[] = [
    {
      period: 'Sep 2025 - Present',
      institution: 'Silk Technologies',
      position: 'Network Engineer & Software Developer',
      description:
        'I configure, maintain and troubleshoot client networks in industrial (OT) and critical sectors such as mining, oil and gas, banking and government, and surveyed a 7-site oil and gas network of 600+ devices with SolarWinds. My role also includes software development, currently robotics and AI: the software that makes Unitree Go2 and G1 robots operable remotely, and a real-time vision AI system for industrial inspection.',
    },
    {
      period: 'Jan 2025 - Oct 2025',
      institution: 'Sabores Express',
      position: 'Claims Analyst',
      description:
        'Handled store claims and order incidents, and coordinated with other departments to resolve them.',
    },
    {
      period: 'Aug 2023 - Nov 2023',
      institution: 'Correo Argentino',
      position: 'Electoral Operator',
      description:
        'Operator at the Electoral Transmission Center during the 2023 presidential elections, digitizing and transmitting polling-station results.',
    },
  ]

  const studies: Entry[] = [
    {
      period: 'Aug 2026 - Present',
      institution: 'UNSAM',
      position: 'Telecommunications Engineering',
      description:
        'Engineering degree focused on telecommunications, networks, signal processing, and electronics, building on my programming and networking background.',
    },
    {
      period: 'Aug 2023 - Jul 2026',
      institution: 'UNSAM',
      position: 'University Technician in Computer Programming',
      description:
        'Studies focused on software development, programming paradigms, data structures, algorithms, databases, low-level concepts, and web technologies',
    },
    {
      period: 'In progress',
      institution: 'Cisco',
      position: 'CCNP Enterprise (ENCOR exam)',
      description:
        'Preparing the core exam of the CCNP Enterprise certification: enterprise network architecture, virtualization, infrastructure, assurance, security, and automation.',
    },
    {
      period: 'Jul 2026',
      institution: 'Cisco',
      position: 'CCNA (Cisco Certified Network Associate)',
      description:
        'Certified network associate. Network fundamentals, routing and switching, network security, and automation.',
      // Lives in public/ so the URL stays stable (the CV links to it too)
      link: {
        href: `${import.meta.env.BASE_URL}certificates/CCNA-certificate.pdf`,
        label: 'View certificate',
      },
    },
    {
      period: 'Mar 2024',
      institution: 'University of Cambridge',
      position: 'First Certificate in English (FCE)',
      description:
        'Demonstrates strong upper-intermediate proficiency in reading, writing, listening, and speaking.',
    },
  ]

  const data = active === 'work' ? workExperience : studies

  return (
    <div className="w-full rounded-r-2xl p-4 pt-8">
      <div className="border-app-l">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="glass-effect rounded-r-2xl"
          >
            {data.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex p-6 pt-3 pb-3"
              >
                <div className="flex flex-col">
                  <div className="app-text-faint text-sm">{item.period}</div>
                  <h3 className="app-text-color text-xl font-semibold">
                    {item.institution}
                  </h3>
                  <div className="app-text-body">{item.position}</div>
                  {item.description && (
                    <p className="app-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="app-text-color mt-2 flex w-fit items-center gap-1 text-sm font-medium hover:underline"
                    >
                      {item.link.label}
                      <IconExternalLink size={16} stroke={1.5} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ExperienceInfo
