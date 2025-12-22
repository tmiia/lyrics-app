import { usePlayer } from '@/context/PlayerContext'
import { useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type VinylRecordProps = {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}

const VinylRecord = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }: VinylRecordProps) => {
  const gltf = useLoader(GLTFLoader, '/models/12_vinyl_record_v2.glb')
  const { state } = usePlayer()
  const groupRef = useRef<THREE.Group>(null)
  const velocityRef = useRef(0)

  const targetSpeed = 0.5
  const acceleration = 2.5
  const friction = 0.97

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (state.isPlaying) {
      velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, targetSpeed, acceleration * delta)
    } else {
      velocityRef.current *= friction
      if (Math.abs(velocityRef.current) < 0.001) {
        velocityRef.current = 0
      }
    }

    groupRef.current.rotation.z -= velocityRef.current * delta
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default VinylRecord
