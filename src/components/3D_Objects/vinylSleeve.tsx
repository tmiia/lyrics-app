import { useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useEffect } from 'react'
import { Mesh } from 'three'
import { usePlayer } from "@/context/PlayerContext"

const VinylSleeve = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const { state } = usePlayer()
  const gltf = useLoader(GLTFLoader, '/models/vinyl_record_sleeve_only_bake.glb')

  const coverTexture = useTexture(state.currentTrack?.cover || '/covers/default_cover.jpg')

  useEffect(() => {
    if (gltf.scene && coverTexture) {
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.map = coverTexture
              material.needsUpdate = true
            })
          } else {
            child.material.map = coverTexture
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [gltf.scene, coverTexture, state.currentTrack?.cover])

  return (
    <primitive
      object={gltf.scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default VinylSleeve
