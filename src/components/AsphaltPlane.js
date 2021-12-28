import React from 'react';
import Ambient from '../assets/textures/ao.jpg';
import Height from '../assets/textures/height.jpg';
import Normal from '../assets/textures/normal.jpg';
import Roughness from '../assets/textures/roughness.jpg';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const AsphaltPlane = (props) => {
  const [ambientMap, heightMap, normalMap, roughnessMap] = useLoader(
    TextureLoader,
    [Ambient, Height, Normal, Roughness]
  );

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
  });

  return (
    <>
      <mesh
        position={[0, -1.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeBufferGeometry args={[6, 6, 1000, 1000]} />
        <meshPhysicalMaterial
          color='#000'
          aoMap={ambientMap}
          displacementMap={heightMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          displacementScale={props.displacementScale}
          clearcoat={props.clearcoat}
          clearcoatRoughness={props.clearcoatRoughness}
          ior={props.ior}
          reflectivity={props.reflectivity}
          metalness={props.metalness}
          roughness={props.roughness}
        />
      </mesh>
    </>
  );
};
