import { Canvas } from '@react-three/fiber'
import MenuBoxItem from './components/MenuBoxItem'
import { OrbitControls } from '@react-three/drei'

function App() {

  
  return (
    <Canvas camera={{fov: 100, position: [0, 0, 5]}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 0]} angle={Math.PI / 2} penumbra={1} decay={0} intensity={Math.PI * 2} />
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <MenuBoxItem position={[-1, 0, -10]} />
      <MenuBoxItem position={[1, 0, -10]} />
      <OrbitControls />
    </Canvas>
  )
}

export default App
