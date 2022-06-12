import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls, Stars, CameraShake } from '@react-three/drei';
import { useControls } from 'leva';
import { Html } from '@react-three/drei';
import Deer from '../models/Deer';
import { canvasContainer } from '../../styling';
import { Ocean } from './Ocean';
import { Viewcube } from './Portal';

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
            {/* <Box args={[30, 45, 0.6]} position={[-10, 23.01, -1.5]}>
                <meshPhysicalMaterial
                    color="red"
                    metalness={0.1}
                    roughness={0.3}
                />
            </Box> */}
            <Ocean />
        </group>
    );
}

export function Loading() {
    return (
        <Html
            center
            as="span"
            style={{ color: 'white', backgroundColor: 'rgb(33,33,33)' }}
        >
            Loading...
        </Html>
    );
}

const Home = () => {
    // const { color, near, far } = useControls({
    //     color: '#212121',
    //     near: { value: -324, min: -1000, max: 1000, step: 0.01 },
    //     far: { value: 420, min: 0, max: 1000, step: 0.01 },
    // });
    const { oX, oY, oZ } = useControls('OG Portal', {
        // position={[-10, 23.01, -1]}
        oX: { value: 0, min: -200, max: 200, step: 0.01 },
        oY: { value: 23.01, min: -200, max: 200, step: 0.01 },
        oZ: { value: -1, min: -200, max: 200, step: 0.01 },
    });

    const { aX, aY, aZ, rx, ry, rz } = useControls('Another Portal', {
        // position={[-10, 23.01, -1]}
        aX: { value: -60, min: -200, max: 200, step: 0.01 },
        aY: { value: 23.01, min: -200, max: 200, step: 0.01 },
        aZ: { value: 59, min: -200, max: 200, step: 0.01 },
        rx: { value: 0, min: -10, max: 10, step: 0.01 },
        ry: { value: Math.PI / 2, min: -10, max: 10, step: 0.01 },
        rz: { value: 0, min: -10, max: 10, step: 0.01 },
    });
    return (
        <div css={canvasContainer}>
            <Canvas
                gl={{ antialias: false }}
                camera={{ position: [-72, 72, 72], fov: 60 }}
            >
                {/* <fog attach="fog" args={[color, near, far]} /> */}
                <fog attach="fog" args={['#212122', -324, 420]} />
                <OrbitControls
                    // enablePan={false}
                    // enableZoom={false}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.01}
                    // minAzimuthAngle={-Math.PI / 2}
                    // maxAzimuthAngle={Math.PI / 2}
                    enableDamping={true}
                    makeDefault
                />
                <ambientLight intensity={0.4} />
                <directionalLight intensity={1.5} position={[2.5, 8, 5]} />
                <pointLight
                    position={[-10, 0, -20]}
                    color="red"
                    intensity={2.5}
                />
                <pointLight position={[0, -10, 0]} intensity={1.5} />
                <Suspense fallback={<Loading />}>
                    <Viewcube
                        position={[0, 23.01, 119]}
                        rotation={[0, Math.PI, 0]}
                    />
                    <Viewcube
                        position={[60, 23.01, 59]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                    <Viewcube position={[aX, aY, aZ]} rotation={[rx, ry, rz]} />
                    <Viewcube position={[oX, oY, oZ]} rotation={[0, 0, 0]} />
                    <ReflectionScene />
                </Suspense>
                <CameraShake
                    yawFrequency={0.05}
                    pitchFrequency={0.05}
                    rollFrequency={0.05}
                />
            </Canvas>
        </div>
    );
};

export default Home;
