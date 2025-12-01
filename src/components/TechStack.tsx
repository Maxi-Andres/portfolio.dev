import { IconBrandPython } from '@tabler/icons-react';

import TechItem from "./TechItem"


const TechStack = () => {
  return (
    <>
      <div className="flex py-10 flex-col items-center w-full">

        <div className="flex items-start w-full max-w-6xl mb-6">
          <h2 className="text-3xl font-semibold text-neutral-400">Tech Stack</h2>
        </div>

        {/* Masonry Layout usando columnas CSS */}
        <div className="w-full max-w-6xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

            {/* Programming Languages */}
            <div className="break-inside-avoid group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
              hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
              
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Programming Languages</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Proficient in multiple programming languages for diverse development needs.
              </p>
              
              <div className="flex flex-wrap gap-3 items-center">
                <TechItem icon="🐍" title="Python"><IconBrandPython stroke={1} /></TechItem>
                <TechItem icon="⚙️" title="C/C++" />
                <TechItem icon="🔩" title="Assembly" />
                <TechItem icon="🅺" title="Kotlin" />
                <TechItem icon="💛" title="JavaScript" />
                <TechItem icon="💙" title="TypeScript" />
                <TechItem icon="🌐" title="HTML" />
                <TechItem icon="🎨" title="CSS" />
                <TechItem icon="🗄️" title="SQL" />
              </div>
            </div>

            {/* Data Science & ML */}
            <div className="break-inside-avoid group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
              hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
              
              <div className="absolute top-0 left-0 right-0 h-0.5 via-white/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Data Science & ML</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Analyzing data and building machine learning models.
              </p>
              
              <div className="flex flex-wrap gap-3 items-center">
                <TechItem icon="📓" title="Jupyter Notebook" />
                <TechItem icon="🐼" title="Pandas" />
                <TechItem icon="🔢" title="NumPy" />
                <TechItem icon="🤖" title="Scikit-learn" />
                <TechItem icon="🧠" title="Machine Learning" />
              </div>
            </div>

            {/* Networking */}
            <div className="break-inside-avoid group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
              hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
              
              <div className="absolute top-0 left-0 right-0 h-0.5  via-white/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Networking</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Network configuration and enterprise solutions.
              </p>
              
              <div className="flex flex-wrap gap-2.5 items-center">
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs font-medium text-blue-200 
                  hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default">Cumulus Linux</div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs font-medium text-blue-200 
                  hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default">Cisco IOS</div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-xs font-medium text-blue-200 
                  hover:bg-blue-500/30 hover:scale-105 transition-all duration-300 cursor-default">SDN</div>
              </div>
            </div>


            {/* Frameworks & Libraries */}
            <div className="break-inside-avoid group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
              hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
              
              <div className="absolute top-0 left-0 right-0 h-0.5 t via-white/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2">Frameworks & Libraries</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Building modern web applications with cutting-edge frameworks.
              </p>
              
              <div className="flex flex-wrap gap-3 items-center">
                <TechItem icon="⚛️" title="React" />
                <TechItem icon="🔥" title="Svelte" />
                <TechItem icon="💨" title="Tailwind" />
                <TechItem icon="🍃" title="Spring Boot" />
              </div>
            </div>

            {/* DevOps & Infrastructure */}
            <div className="break-inside-avoid group relative bg-neutral-950/60 border border-neutral-800 rounded-2xl p-6 overflow-hidden 
              hover:border-neutral-600 transition-all duration-300 backdrop-blur-sm">
              
              <div className="absolute top-0 left-0 right-0 h-0.5 via-white/30 to-transparent 
                -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <h3 className="text-xl font-semibold text-white mb-2">DevOps & Infrastructure</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Managing infrastructure and automation.
              </p>
              
              <div className="flex flex-wrap gap-3 items-center">
                <TechItem icon="🐙" title="GitHub" />
                <TechItem icon="📦" title="Git" />
                <TechItem icon="🔧" title="Ansible" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default TechStack