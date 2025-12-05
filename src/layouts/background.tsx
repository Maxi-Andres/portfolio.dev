
import NeonBackgroundEffect from "../components/backgrounds/NeonBackground"
import LightPillar from "@/components/backgrounds/LightPillar"
import { ShootingStars } from "@/components/backgrounds/shooting-stars";
import { StarsBackground } from "@/components/backgrounds/stars-background";

export const MainBackground = () => {

  return (
    <>
      {/*//? esto ponele un condicional */}

      <NeonBackgroundEffect/> 

        {/* <LightPillar
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
        /> */}

      {/* <ShootingStars
        minSpeed={10}
        maxSpeed={30}
        minDelay={4200}
        maxDelay={8700}
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
      /> */}

    </>
  )
}