import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const VinylRecord = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
  const gltf = useLoader(GLTFLoader, '/models/12_vinyl_record.glb')

  return (
    <primitive
      object={gltf.scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

export default VinylRecord
