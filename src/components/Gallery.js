import React, { Suspense } from 'react';
import { Gal, ImageContainer } from '../styling';
import { Canvas } from '@react-three/fiber';
import { Ocean } from './HomePage/Ocean';
import { Loading } from './HomePage/Home';

export const Gallery = () => {
  return (
    <>
      <Gal>
        <ImageContainer>
          <img src='/assets/textures/nofuture.png' alt='nofure' />
          <img
            src='/assets/textures/nightwalk-final-edited.jpg'
            alt='nightwalk'
          />
          <img src='/assets/textures/spooky.png' alt='spooky' />
          <img src='/assets/textures/Fog2020-edited.jpg' alt='fog2020' />
          <img src='/assets/textures/cardistry2048.png' alt='cardistry2048' />
        </ImageContainer>
      </Gal>
      <Canvas camera={{ position: [-72, 72, 72], fov: 60 }}>
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.9} />
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
          <Ocean />
        </Suspense>
      </Canvas>
    </>
  );
};
