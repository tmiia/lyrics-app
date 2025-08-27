import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const VinylSleeve = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const gltf = useLoader(GLTFLoader, '/models/vinyl_record_sleeve_only_bake.glb')

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
