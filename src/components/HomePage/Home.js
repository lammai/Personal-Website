import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Stars,
    CameraShake,
    Box,
    Loader,
} from '@react-three/drei';
// import { useControls } from 'leva';
import Deer from '../models/Deer';
import { Ocean } from './Ocean';
import { Viewcube } from './Portal';
import { Intro, Link } from '../FloatingLinks';

function ReflectionScene() {
    const starsRef = useRef();

    useFrame(({ clock, camera, controls }) => {
        starsRef.current.rotation.z = clock.getElapsedTime() / 60;
        starsRef.current.rotation.y = clock.getElapsedTime() / 60;

        // camera debugging
        // const values = {
        //     position: camera.position,
        //     target: controls.target,
        // };
        // console.log(values);
    });

    return (
        <group>
            <Deer position={[-5, 0, 15]} />
            <Stars
                radius={6}
                depth={60}
                count={99}
                factor={2}
                saturation={99}
                fade
                ref={starsRef}
            />
            <Box args={[30, 45, 0.03]} position={[-10, 23.01, -1.08]}>
                <meshPhysicalMaterial
                    color="red"
                    metalness={0.1}
                    roughness={0.3}
                />
            </Box>
            <Ocean />
        </group>
    );
}

const Home = () => {
    // const { color, near, far } = useControls({
    //     color: '#212121',
    //     near: { value: -324, min: -1000, max: 1000, step: 0.01 },
    //     far: { value: 420, min: -500, max: 1000, step: 0.01 },
    // });
    return (
        <>
            <Canvas camera={{ position: [-27.24, 33.79, 118.77], fov: 60 }}>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 60}
                    maxPolarAngle={Math.PI / 1.85}
                    minAzimuthAngle={-Math.PI / 2.045}
                    maxAzimuthAngle={Math.PI / 2.045}
                    enableDamping={true}
                    target={[-2.76, 18.53, -5.98]}
                    makeDefault
                />
                <CameraShake
                    yawFrequency={0.06}
                    pitchFrequency={0.06}
                    rollFrequency={0.06}
                />
                {/* <fog attach="fog" args={[color, near, far]} /> */}
                <fog attach="fog" args={['#656565', -1000, 1000]} />
                <ambientLight intensity={0.69} />
                <pointLight
                    position={[-10, 0, -20]}
                    color="red"
                    intensity={3}
                />
                <pointLight position={[-10, 20, 0]} intensity={1.5} />
                <Suspense fallback={null}>
                    <Viewcube />
                    <ReflectionScene />
                    <Intro
                        position={[-8, 50, 0]}
                        intro={'Hi! 👋 My name is Lam'}
                        currentJob={'Software Engineer @ DocuSign'}
                        symbol={'📝'}
                    />
                    <Link
                        position={[11, 10, 0]}
                        url={'mailto:lam7.2521@gmail.com'}
                        label={'Email 📨'}
                    />
                    <Link
                        position={[12, 20, 0]}
                        url={'https://www.linkedin.com/in/lammal'}
                        label={'🔗 LinkedIn'}
                    />
                    <Link
                        position={[11, 30, 0]}
                        url={'https://github.com/lammai'}
                        label={'Github 🔀'}
                    />
                    <Link
                        position={[12, 40, 0]}
                        url={'/assets/resume-lammai.pdf'}
                        label={'📜 Resume'}
                    />
                </Suspense>
            </Canvas>
            <Loader />
        </>
    );
};

export default Home;
