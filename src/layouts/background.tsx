import NeonBackgroundEffect from '../components/backgrounds/NeonBackground'
import LightPillar from '@/components/backgrounds/LightPillar'
import { ShootingStars } from '@/components/backgrounds/shooting-stars'
import { StarsBackground } from '@/components/backgrounds/stars-background'
import { useBackground } from '@/context/Context'
import LetterGlitch from '@/components/backgrounds/LetterGlitch'

export const MainBackground = () => {
  // este es el background de el context
  const { background } = useBackground()

  const renderBackground = () => {
    switch (background) {
      case 'White':
        return (
          <div className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-white/50" />
        )
      //! para el modo blanco tenes que poner modo claro y oscuro y cambiar todos los colores de las letras y los bordes
      case 'Black':
        return (
          <div className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-white/5" />
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
      default:
        return <NeonBackgroundEffect />
    }
  }

  return renderBackground()
}
