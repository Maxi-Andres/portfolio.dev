import { useState } from "react"
import ExperienceInfo from "./ExperienceInfo"

const Experience = () => {

  const [active, setActive] = useState<"work" | "studies">("work")

  return (
    <>
      <div className="flex py-10 pb-6 flex-col items-center w-full px-5 sm:px-10 lg:px-0">

        <div className="flex items-start w-full mb-6">
          <h2 className="text-2xl lg:text-3xl font-semibold text-neutral-400">Experience</h2>
        </div>

        <div className="w-full">
          <ul className="flex border border-neutral-800 backdrop-blur-md rounded-2xl shadow-lg w-full">

            <button
              className={`text-center py-2 px-4 rounded-2xl hover:text-white cursor-pointer selection:bg-amber-50 w-1/2
              ${active === "work" ? "text-white bg-white/10 border border-neutral-600" : "text-neutral-400 hover:text-neutral-200"}`}
              onClick={() => setActive("work")}
            >Work</button>

            <button
              className={`text-center py-2 px-4 rounded-2xl hover:text-white cursor-pointer selection:bg-amber-50 w-1/2
              ${active === "studies" ? "text-white bg-white/10 border border-neutral-600" : "text-neutral-400 hover:text-neutral-200"}`}
              onClick={() => setActive("studies")}
            >Studies</button>

          </ul>
        </div>

        <ExperienceInfo active={active} />

      </div>
    </>
  )
}

export default Experience
