type ExperienceInfoProps = {
  active: "work" | "studies"
}

const ExperienceInfo = ({ active }: ExperienceInfoProps) => {

  const workExperience = [
    {
      period: "Sep 2025 - Present",
      institution: "Silk Tech srl",
      position: "Junior Network Engineer",
      description: "Network infrastructure management and maintenance. Configuration and troubleshooting of networking equipment. Support in implementing network security protocols and monitoring network performance."
    },
  ]

  const studies = [
    {
      period: "2023 - Present",
      institution: "UNSAM",
      position: "University Technician in Computer Programming",
      description: "Studies focused on software development, programming paradigms, data structures, algorithms, databases, low-level concepts, and web technologies"
    },
    {
      period: "2025 - Present",
      institution: "Cisco Networking Academy",
      position: "CCNA (Cisco Certified Network Associate)",
      description: "Studying for CCNA certification - Network fundamentals, routing and switching, network security, and automation."
    },
    {
      period: "Completed",
      institution: "University of Cambridge",
      position: "First Certificate in English (FCE)",
      description: "Demonstrates strong upper-intermediate proficiency in reading, writing, listening, and speaking."
    }
  ]

  const data = active === "work" ? workExperience : studies

  return (
    <div className="w-full p-4 pt-8">
      <div className="border-l border-neutral-800">

        <div className="">
          {data.map((item, index) => (
            <div key={index} className="flex p-6 pb-3 pt-3">
              <div className="flex flex-col">
                <div className="text-sm text-neutral-500">{item.period}</div>
                <h3 className="text-xl font-semibold text-neutral-200">
                  {item.institution}
                </h3>
                <div className="text-neutral-200">
                  {item.position}
                </div>
                {item.description && (
                  <p className="text-neutral-400 leading-relaxed">
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
