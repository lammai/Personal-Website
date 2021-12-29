import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { canvasContainer } from '../styling';
import {
  MeshReflectorMaterial,
  OrbitControls,
  useTexture,
  useHelper,
} from '@react-three/drei';
import { useControls } from 'leva';
import pathDist from '../assets/textures/dist_map.jpeg';
import pathNorm from '../assets/textures/NORM.jpg';
import pathRough from '../assets/textures/roughness_floor.jpeg';
import { softShadows } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

softShadows();

function ReflectionScene() {
  const {
    resolution,
    mirror,
    mixBlur,
    mixStrength,
    blur,
    minDepthThreshold,
    maxDepthThreshold,
    depthScale,
    depthToBlurRatioBias,
    debug,
    distortion,
    color,
    metalness,
    roughness,
    normalScale,
    x,
    y,
    z,
    sphereColor,
  } = useControls({
    resolution: { value: 1024, min: 0, max: 1024, step: 1 },
    mirror: { value: 0.75, min: -1, max: 1, step: 0.01 },
    mixBlur: { value: 10, min: 0, max: 20, step: 1 },
    mixStrength: { value: 2, min: 0, max: 5, step: 0.1 },
    blur: { value: [300, 300] },
    minDepthThreshold: { value: 0.8, min: 0, max: 5, step: 0.1 },
    maxDepthThreshold: { value: 1.2, min: 0, max: 5, step: 0.1 },
    depthScale: { value: 0, min: 0, max: 5, step: 0.01 },
    depthToBlurRatioBias: { value: 0.2, min: -1, max: 1, step: 0.01 },
    debug: { value: 0, min: 0, max: 1, step: 1 },
    distortion: { value: 0, min: 0, max: 3, step: 0.01 },
    color: '#a0a0a0',
    metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    roughness: { value: 1, min: 0, max: 1, step: 0.01 },
    normalScale: { value: 0.09, min: 0, max: 1, step: 0.01 },
    x: { value: 0, min: -15, max: 15, step: 0.01 },
    y: { value: 1, min: -15, max: 15, step: 0.01 },
    z: { value: 0, min: -15, max: 15, step: 0.01 },
    sphereColor: '#c7fff3',
  });

  const [distMap, normalMap, roughnessMap] = useTexture([
    pathDist,
    pathNorm,
    pathRough,
  ]);

  const directLightRef = useRef();
  useHelper(directLightRef, DirectionalLightHelper, 0.5, 'hotpink');

  return (
    <group>
      <mesh position={[x, y, z]} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={sphereColor}
          roughness={0}
          metalness={0.1}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          resolution={resolution}
          mirror={mirror}
          mixBlur={mixBlur}
          mixStrength={mixStrength}
          blur={blur}
          minDepthThreshold={minDepthThreshold}
          maxDepthThreshold={maxDepthThreshold}
          depthScale={depthScale}
          depthToBlurRatioBias={depthToBlurRatioBias}
          debug={debug}
          distortion={distortion}
          distortionMap={distMap}
          color={color}
          metalness={metalness}
          roughnessMap={roughnessMap}
          roughness={roughness}
          normalMap={normalMap}
          normalScale={normalScale}
        />
      </mesh>
    </group>
  );
}

const Home = () => {
  return (
    <div css={canvasContainer}>
      <Canvas shadows camera={{ position: [-2, 3, 3] }}>
        <Suspense fallback={null}>
          <OrbitControls />
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
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
