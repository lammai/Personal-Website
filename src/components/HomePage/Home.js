import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Stars } from '@react-three/drei';
import { useControls } from 'leva';
import { softShadows, Html } from '@react-three/drei';
import Deer from '../models/Deer';
import { canvasContainer } from '../../styling';
import { Ocean } from './Ocean';
import { Viewcube } from './Portal';

softShadows();

function ReflectionScene() {
  const starsRef = useRef();

  useFrame(({ clock }) => {
    starsRef.current.rotation.z = clock.getElapsedTime() / 60;
    starsRef.current.rotation.y = clock.getElapsedTime() / 60;
  });

  return (
    <group>
      <Deer />
      <Stars
        radius={6}
        depth={60}
        count={99}
        factor={2}
        saturation={99}
        fade
        ref={starsRef}
      />
      <Box args={[30, 45, 0.6]} position={[-10, 23.01, -1.5]}>
        <meshPhysicalMaterial color='red' metalness={0.1} roughness={0.3} />
      </Box>
      <Ocean />
    </group>
  );
}

const Home = () => {
  // const { color, near, far } = useControls({
  //   color: '#212121',
  //   near: { value: -324, min: -1000, max: 1000, step: 0.01 },
  //   far: { value: 420, min: 0, max: 1000, step: 0.01 },
  // });
  return (
    <div css={canvasContainer}>
      <Canvas shadows camera={{ position: [-72, 72, 72], fov: 60 }}>
        <Suspense fallback={<Html center>Loading...</Html>}>
          {/* <fog attach='fog' args={[color, near, far]} /> */}
          <fog attach='fog' args={['#212121', -324, 420]} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.01}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
            enableDamping={true}
            makeDefault
          />
          <ambientLight intensity={0.4} />
          <directionalLight
            intensity={1.5}
            position={[2.5, 8, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -20]} color='red' intensity={2.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <ReflectionScene />
          <Viewcube />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
