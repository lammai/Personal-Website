import React from 'react';
import { Gal, ImageContainer } from '../styling';
import { Canvas } from '@react-three/fiber';
import { Ocean } from './HomePage/Ocean';

export const Gallery = () => {
    return (
        <>
            <Gal>
                <ImageContainer>
                    <img
                        src="/assets/textures/nofuture-reboot.png"
                        alt="nofure"
                    />
                    <img
                        src="/assets/textures/nightwalk-final-edited.jpg"
                        alt="nightwalk"
                    />
                    <img src="/assets/textures/spooky.png" alt="spooky" />
                    <img
                        src="/assets/textures/Fog2020-edited.jpg"
                        alt="fog2020"
                    />
                    <img
                        src="/assets/textures/cardistry2048.png"
                        alt="cardistry2048"
                    />
                </ImageContainer>
            </Gal>
            <Canvas camera={{ position: [-72, 72, 72], fov: 60 }}>
                <Ocean rotationX={-Math.PI / 2} rotationY={0} size={1500} />
            </Canvas>
        </>
    );
};
