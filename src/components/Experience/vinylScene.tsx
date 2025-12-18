import VinylSleeve from '@/components/Experience/vinylSleeve'
import VinylRecord from '@/components/Experience/vinylRecord'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Group } from 'three'
import { useSpring, animated, config } from '@react-spring/three'


interface VinylSceneProps {
  isPlaying: boolean
}

const AnimatedVinyls = ({ isPlaying }: { isPlaying: boolean }) => {
  const groupRef = useRef<Group>(null)

  const { sleeveY } = useSpring({
    sleeveY: isPlaying ? -10 : -15,
    config: config.gentle,
    delay: isPlaying ? 120 : 0,
  })

  const { recordY } = useSpring({
    recordY: isPlaying ? -5 : -11,
    config: config.gentle,
  })

  return (
    <group ref={groupRef}>
      <animated.group position-y={sleeveY}>
        <VinylSleeve
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[50, 50, 50]}
        />
      </animated.group>

      <animated.group position-y={recordY}>
        <VinylRecord
          position={[0, 0, -0.1]}
          rotation={[-2.30, 0, 0]}
          scale={[54, 54, 54]}
        />
      </animated.group>
    </group>
  )
}

const VinylScene = ({ isPlaying }: VinylSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 90 }}>
      <ambientLight intensity={0.5} />
      <Environment files="/hdrs/reinforced_concrete_01_4k.exr" />
      <AnimatedVinyls isPlaying={isPlaying} />
    </Canvas>
  )
}

export default VinylScene
