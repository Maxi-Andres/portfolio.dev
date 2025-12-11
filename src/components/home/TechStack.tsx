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
  IconChartLine,
} from '@tabler/icons-react'

import TechItem from './TechItem'
import Section from '../shared/SectionContainer'
import GlassCard from '../shared/GlassCard'

const TechStack = () => {
  return (
    <>
      <Section
        title="Tech Stack"
        children={
          <div className="w-full max-w-6xl">
            <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
              {/* Programming Languages */}
              <GlassCard
                children={
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Programming Languages
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      Proficient in multiple programming languages for diverse
                      development needs.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] justify-center gap-3">
                      <TechItem title="Python" href="https://www.python.org/">
                        <IconBrandPython stroke={1} />
                      </TechItem>
                      <TechItem title="C/C++" href="https://isocpp.org/">
                        <IconBrandCpp stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Assembly"
                        href="https://en.wikipedia.org/wiki/Assembly_language"
                      >
                        <IconCpu stroke={1} />
                      </TechItem>
                      <TechItem title="Kotlin" href="https://kotlinlang.org/">
                        <IconBrandKotlin stroke={1} />
                      </TechItem>
                      <TechItem
                        title="JavaScript"
                        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                      >
                        <IconBrandJavascript stroke={1} />
                      </TechItem>
                      <TechItem
                        title="TypeScript"
                        href="https://www.typescriptlang.org/"
                      >
                        <IconBrandTypescript stroke={1} />
                      </TechItem>
                    </div>
                  </>
                }
              />

              {/* DevOps & Infrastructure */}
              <GlassCard
                children={
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      DevOps & Infrastructure
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      Managing infrastructure and automation.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] justify-center gap-3">
                      <TechItem title="GitHub" href="https://github.com/">
                        <IconBrandGithub stroke={1} />
                      </TechItem>
                      <TechItem title="Git" href="https://git-scm.com/">
                        <IconBrandGit stroke={1} />
                      </TechItem>
                      <TechItem title="Ansible" href="https://www.ansible.com/">
                        <IconBrandAnsible stroke={1} />
                      </TechItem>
                      <TechItem title="SQL" href="https://www.sql.org/">
                        <IconDatabase stroke={1} />
                      </TechItem>
                    </div>
                  </>
                }
              />

              {/* Data Science & ML */}
              <GlassCard
                children={
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Data Science & ML
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      Analyzing data and building machine learning models.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] justify-center gap-3">
                      <TechItem
                        title="Jupyter Notebook"
                        href="https://jupyter.org/"
                      >
                        <IconBrandUber stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Pandas"
                        href="https://pandas.pydata.org/"
                      >
                        <IconChartBar stroke={1} />
                      </TechItem>
                      <TechItem title="NumPy" href="https://numpy.org/">
                        <IconGridDots stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Matplotlib"
                        href="https://matplotlib.org/"
                      >
                        <IconChartLine stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Scikit-learn"
                        href="https://scikit-learn.org/"
                      >
                        <IconRobot stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Machine Learning"
                        href="https://en.wikipedia.org/wiki/Machine_learning"
                      >
                        <IconBrain stroke={1} />
                      </TechItem>
                    </div>
                  </>
                }
              />

              {/* Networking */}
              <GlassCard
                children={
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Networking
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      Network configuration and enterprise solutions.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] justify-center gap-3">
                      <TechItem
                        title="Cumulus Linux"
                        href="https://www.nvidia.com/en-us/networking/ethernet-switching/cumulus-linux/"
                      >
                        <IconCloud stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Cisco IOS"
                        href="https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-technologies/index.html"
                      >
                        <IconRouter stroke={1} />
                      </TechItem>
                      <TechItem
                        title="SDN"
                        href="https://en.wikipedia.org/wiki/Software-defined_networking"
                      >
                        <IconTopologyStar3 stroke={1} />
                      </TechItem>
                    </div>
                  </>
                }
              />

              {/* Frameworks & Libraries */}
              <GlassCard
                children={
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Frameworks & Web Technologies
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                      Building modern web applications with cutting-edge
                      frameworks.
                    </p>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] justify-center gap-3">
                      <TechItem title="React" href="https://react.dev/">
                        <IconBrandReact stroke={1} />
                      </TechItem>
                      <TechItem title="Svelte" href="https://svelte.dev/">
                        <IconBrandSvelte stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Tailwind"
                        href="https://tailwindcss.com/"
                      >
                        <IconBrandTailwind stroke={1} />
                      </TechItem>
                      <TechItem
                        title="Spring Boot"
                        href="https://spring.io/projects/spring-boot"
                      >
                        <IconLeaf stroke={1} />
                      </TechItem>
                      <TechItem
                        title="HTML"
                        href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                      >
                        <IconBrandHtml5 stroke={1} />
                      </TechItem>
                      <TechItem
                        title="CSS"
                        href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                      >
                        <IconBrandCss3 stroke={1} />
                      </TechItem>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        }
      />
    </>
  )
}

export default TechStack
