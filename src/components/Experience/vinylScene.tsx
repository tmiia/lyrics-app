import VinylSleeve from '@/components/Experience/vinylSleeve'
import VinylRecord from '@/components/Experience/vinylRecord'
import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Group } from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { usePlayer } from '@/context/PlayerContext'


interface VinylSceneProps {
  isPlaying: boolean
}

const ModelsLoadedNotifier = () => {
  const { dispatch } = usePlayer()

  useEffect(() => {
    dispatch({ type: "SET_MODELS_LOADED" })
  }, [dispatch])

  return null
}

interface AnimatedVinylsProps {
  isPlaying: boolean
  modelsLoaded: boolean
  introComplete: boolean
}

const AnimatedVinyls = ({ isPlaying, modelsLoaded, introComplete }: AnimatedVinylsProps) => {
  const groupRef = useRef<Group>(null)

  const isReady = modelsLoaded && introComplete

  const getSleeveY = () => {
    if (!isReady) return -25
    if (isPlaying) return -10
    return -15
  }

  const getRecordY = () => {
    if (!isReady) return -22
    if (isPlaying) return -5
    return -11
  }

  const { sleeveY } = useSpring({
    sleeveY: getSleeveY(),
    config: config.gentle,
    delay: isPlaying ? 120 : 0,
  })

  const { recordY } = useSpring({
    recordY: getRecordY(),
    config: config.gentle,
  })

  return (
    <group ref={groupRef}>
      <animated.group position-y={sleeveY}>
        <VinylSleeve
          position={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[50, 50, 50]}
        />
      </animated.group>

      <animated.group position-y={recordY}>
        <VinylRecord
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[53, 53, 53]}
        />
      </animated.group>
    </group>
  )
}

const VinylScene = ({ isPlaying }: VinylSceneProps) => {
  const { state } = usePlayer()

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 90 }}>
      <ambientLight intensity={0.5} />
      <Environment files="/hdrs/concrete.hdr" />
      <Suspense fallback={null}>
        <AnimatedVinyls 
          isPlaying={isPlaying} 
          modelsLoaded={state.modelsLoaded} 
          introComplete={state.introComplete} 
        />
        <ModelsLoadedNotifier />
      </Suspense>
    </Canvas>
  )
}

export default VinylScene
