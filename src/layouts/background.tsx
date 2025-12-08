import NeonBackgroundEffect from '../components/backgrounds/NeonBackground'
import LightPillar from '@/components/backgrounds/LightPillar'
import { ShootingStars } from '@/components/backgrounds/shooting-stars'
import { StarsBackground } from '@/components/backgrounds/stars-background'
import { useBackground } from '@/context/Context'
import LetterGlitch from '@/components/backgrounds/LetterGlitch'
import ColorBends from '@/components/backgrounds/ColorBends'
import Dither from '@/components/backgrounds/Dither'
import FaultyTerminal from '@/components/backgrounds/FaultyTerminal'

export const MainBackground = () => {
  // este es el background de el context
  const { background } = useBackground()

  const renderBackground = () => {
    switch (background) {
      case 'White':
        return (
          <div className="pointer-events-none fixed inset-0 h-full w-full bg-[#fafafa]" />
        )
      //! para el modo blanco tenes que poner modo claro y oscuro y cambiar todos los colores de las letras y los bordes
      case 'Black':
        return (
          <div className="pointer-events-none fixed inset-0 h-full w-full bg-[#171717]" />
        )
      case 'Neon Glow':
        return <NeonBackgroundEffect />
      case 'Shooting Stars':
        return (
          <>
            <ShootingStars
              minSpeed={10}
              maxSpeed={30}
              minDelay={3000}
              maxDelay={4000}
              starColor="#9E00FF"
              trailColor="#2EB9DF"
              starWidth={10}
              starHeight={1}
              className=""
            />
            <StarsBackground
              starDensity={0.00115}
              allStarsTwinkle={true}
              twinkleProbability={0.7}
              minTwinkleSpeed={0.5}
              maxTwinkleSpeed={1}
              className=""
            />
          </>
        )
      case 'Light Pillar':
        return (
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1.5}
            rotationSpeed={0.2}
            glowAmount={0.001}
            pillarWidth={8.3}
            pillarHeight={1.6}
            noiseIntensity={1.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="normal"
            className=""
          />
        )
      case 'Letter Glitch':
        return (
          <LetterGlitch
            glitchSpeed={90}
            centerVignette={true}
            outerVignette={true}
            smooth={true}
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
          />
        )
      case 'Color Bends':
        return (
          <ColorBends
            rotation={0}
            speed={0.1}
            colors={[]}
            transparent={true}
            scale={0.9}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            className="z-10"
            style={{}}
          />
        )
      case 'Dither':
        return (
          <div className="fixed top-0 left-0 h-full w-full">
            <Dither
              waveSpeed={0.01}
              waveFrequency={4}
              waveAmplitude={0.34}
              waveColor={[0.5, 0.5, 0.5]}
              colorNum={3}
              pixelSize={1}
              disableAnimation={false}
              enableMouseInteraction={false}
              mouseRadius={0.01}
            />
          </div>
        )
      case 'Faulty Terminal':
        return (
          <div className="fixed top-0 left-0 h-full w-full">
            <FaultyTerminal
              scale={5}
              gridMul={[2, 1]} // Densidad de la matriz [x, y]
              digitSize={1.2}
              timeScale={0.2}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={4}
              flickerAmount={1}
              noiseAmp={1.4}
              chromaticAberration={0.2}
              dither={1}
              curvature={0.05} // Distorsión tipo CRT
              tint="#bbffa6"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={0.4}
              className=""
              style={{}}
            />
          </div>
        )
      default:
        return <NeonBackgroundEffect />
    }
  }

  return renderBackground()
}
