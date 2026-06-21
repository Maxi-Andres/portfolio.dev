import Section from '@/components/shared/SectionContainer'
import GlassCard from '../shared/GlassCard'
import CarGame from './game/CarGame'

const Game = () => {
  return (
    <Section title="Play a game">
      <GlassCard hover={false} className="flex w-full justify-center">
        <CarGame />
      </GlassCard>
    </Section>
  )
}

export default Game
