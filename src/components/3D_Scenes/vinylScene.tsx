import LoadingFallback from '@/components/3D_Objects/loadingFallback'
import VinylSleeve from '@/components/3D_Objects/vinylSleeve'
import VinylRecord from '@/components/3D_Objects/vinylRecord'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
      <ambientLight intensity={1} />
      {/* <pointLight position={[2, 0, -5]} />
      <directionalLight position={[0, -5, 0]} intensity={1} /> */}

      <directionalLight
        position={[3, -2, -1]}
        target-position={[0, -8, 0]}
        intensity={1.5}
        color="#ff0000"
        castShadow
      />

      <AnimatedVinyls isPlaying={isPlaying} />
    </Canvas>
  )
}

export default VinylScene
