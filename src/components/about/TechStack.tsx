import {
  IconBrandPython,
  IconBrandCpp,
  IconCpu,
  IconBrandKotlin,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandHtml5,
  IconBrandCss3,
  IconDatabase,
  IconBrandUber,
  IconChartBar,
  IconGridDots,
  IconRobot,
  IconBrain,
  IconCloud,
  IconRouter,
  IconTopologyStar3,
  IconBrandReact,
  IconBrandSvelte,
  IconBrandTailwind,
  IconLeaf,
  IconBrandGithub,
  IconBrandGit,
  IconBrandAnsible,
} from "@tabler/icons-react";

import TechItem from "./TechItem";

const TechStack = () => {
  return (
    <>
      <div className="w-full py-10 px-5 sm:px-10 lg:px-0">

        <div className="flex items-start w-full max-w-6xl mb-6">
          <h2 className="text-3xl font-semibold text-neutral-400">Tech Stack</h2>
        </div>

        <div className="w-full max-w-6xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

            {/* Programming Languages */}
            <div className="glass-effect break-inside-avoid group relative border border-neutral-800 rounded-2xl p-6
              hover:border-neutral-600 transition-all duration-300">

              <h3 className="text-xl font-semibold text-white mb-2">Programming Languages</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Proficient in multiple programming languages for diverse development needs.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <TechItem title="Python" href="https://www.python.org/"><IconBrandPython stroke={1} /></TechItem>
                <TechItem title="C/C++" href="https://isocpp.org/"><IconBrandCpp stroke={1} /></TechItem>
                <TechItem title="Assembly" href="https://en.wikipedia.org/wiki/Assembly_language"><IconCpu stroke={1} /></TechItem>
                <TechItem title="Kotlin" href="https://kotlinlang.org/"><IconBrandKotlin stroke={1} /></TechItem>
                <TechItem title="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><IconBrandJavascript stroke={1} /></TechItem>
                <TechItem title="TypeScript" href="https://www.typescriptlang.org/"><IconBrandTypescript stroke={1} /></TechItem>
                <TechItem title="HTML" href="https://developer.mozilla.org/en-US/docs/Web/HTML"><IconBrandHtml5 stroke={1} /></TechItem>
                <TechItem title="CSS" href="https://developer.mozilla.org/en-US/docs/Web/CSS"><IconBrandCss3 stroke={1} /></TechItem>
                <TechItem title="SQL" href="https://www.sql.org/"><IconDatabase stroke={1} /></TechItem>
              </div>
            </div>

            {/* Data Science & ML */}
            <div className="glass-effect break-inside-avoid group relative border border-neutral-800 rounded-2xl p-6
              hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Data Science & ML</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Analyzing data and building machine learning models.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <TechItem title="Jupyter Notebook" href="https://jupyter.org/"><IconBrandUber stroke={1} /></TechItem>
                <TechItem title="Pandas" href="https://pandas.pydata.org/"><IconChartBar stroke={1} /></TechItem>
                <TechItem title="NumPy" href="https://numpy.org/"><IconGridDots stroke={1} /></TechItem>
                <TechItem title="Scikit-learn" href="https://scikit-learn.org/"><IconRobot stroke={1} /></TechItem>
                <TechItem title="Machine Learning" href="https://en.wikipedia.org/wiki/Machine_learning"><IconBrain stroke={1} /></TechItem>
              </div>
            </div>

            {/* Networking */}
            <div className="glass-effect break-inside-avoid group relative border border-neutral-800 rounded-2xl p-6 
              hover:border-neutral-600 transition-all duration-300 ">
              <h3 className="text-xl font-semibold text-white mb-2">Networking</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Network configuration and enterprise solutions.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <TechItem title="Cumulus Linux" href="https://www.nvidia.com/en-us/networking/ethernet-switching/cumulus-linux/"><IconCloud stroke={1} /></TechItem>
                <TechItem title="Cisco IOS" href="https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-technologies/index.html"><IconRouter stroke={1} /></TechItem>
                <TechItem title="SDN" href="https://en.wikipedia.org/wiki/Software-defined_networking"><IconTopologyStar3 stroke={1} /></TechItem>
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="glass-effect break-inside-avoid group relative border border-neutral-800 rounded-2xl p-6 
              hover:border-neutral-600 transition-all duration-300 ">
              <h3 className="text-xl font-semibold text-white mb-2">Frameworks & Libraries</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Building modern web applications with cutting-edge frameworks.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <TechItem title="React" href="https://react.dev/"><IconBrandReact stroke={1} /></TechItem>
                <TechItem title="Svelte" href="https://svelte.dev/"><IconBrandSvelte stroke={1} /></TechItem>
                <TechItem title="Tailwind" href="https://tailwindcss.com/"><IconBrandTailwind stroke={1} /></TechItem>
                <TechItem title="Spring Boot" href="https://spring.io/projects/spring-boot"><IconLeaf stroke={1} /></TechItem>
              </div>
            </div>

            {/* DevOps & Infrastructure */}
            <div className="glass-effect break-inside-avoid group relative border border-neutral-800 rounded-2xl p-6 
              hover:border-neutral-600 transition-all duration-300 ">
              <h3 className="text-xl font-semibold text-white mb-2">DevOps & Infrastructure</h3>
              <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                Managing infrastructure and automation.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <TechItem title="GitHub" href="https://github.com/"><IconBrandGithub stroke={1} /></TechItem>
                <TechItem title="Git" href="https://git-scm.com/"><IconBrandGit stroke={1} /></TechItem>
                <TechItem title="Ansible" href="https://www.ansible.com/"><IconBrandAnsible stroke={1} /></TechItem>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default TechStack;