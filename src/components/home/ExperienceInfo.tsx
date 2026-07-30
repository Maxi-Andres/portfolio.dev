type ExperienceInfoProps = {
  active: 'work' | 'studies'
}

const ExperienceInfo = ({ active }: ExperienceInfoProps) => {
  const workExperience = [
    {
      period: 'Sep 2025 - Present',
      institution: 'Silk Tech srl',
      position: 'Junior Network Engineer',
      description:
        'Network infrastructure management and maintenance. Configuration and troubleshooting of networking equipment. Support in implementing network security protocols and monitoring network performance.',
    },
    {
      period: '2024 - Present',
      institution: 'Freelance',
      position: 'Full Stack Developer',
      description:
        "End-to-end web development for various clients. From UI/UX design and frontend implementation to backend architecture, REST APIs, and database design. Delivering complete, production-ready web applications tailored to each client's needs.",
    },
  ]

  const studies = [
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
      period: 'Jul 2026',
      institution: 'Cisco Networking Academy',
      position: 'CCNA (Cisco Certified Network Associate)',
      description:
        'Certified network professional. Network fundamentals, routing and switching, network security, and automation.',
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
        <div className="glass-effect rounded-r-2xl">
          {data.map((item, index) => (
            <div key={index} className="flex p-6 pt-3 pb-3">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceInfo
