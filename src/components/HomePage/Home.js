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
// import { Perf } from 'r3f-perf';

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
            <Deer position={[-5, -0.15, 15]} />
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
    const orbitRef = useRef();
    // const { color, near, far } = useControls({
    //     color: '#212121',
    //     near: { value: -324, min: -3000, max: 1000, step: 0.01 },
    //     far: { value: 420, min: -500, max: 3000, step: 0.01 },
    // });
    return (
        <>
            <Canvas>
                {/* <Perf position="bottom-right" /> */}
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
                    ref={orbitRef}
                />
                <CameraShake
                    yawFrequency={0.045}
                    pitchFrequency={0.045}
                    rollFrequency={0.045}
                    controls={orbitRef}
                />
                {/* <fog attach="fog" args={[color, near, far]} /> */}
                <fog attach="fog" args={['#212121', -3000, 1984]} />
                {/* <ambientLight intensity={1} />
                <pointLight
                    position={[-20, 0, -20]}
                    color="red"
                    intensity={0}
                />
                <pointLight position={[-10, 20, 0]} intensity={5} />
                <spotLight position={[-10, 5, 0]} color="green" intensity={5} /> */}
                <pointLight
                    color={'#b41717'}
                    // color={color}
                    position={[-10, 30, -5]}
                    intensity={1000000}
                />
                <Suspense fallback={null}>
                    <Viewcube />
                    <ReflectionScene />
                    <Intro
                        position={[-8, 50, 0]}
                        intro={'Hi! Looks like you found my website'}
                        currentJob={'Have fun looking around'}
                        symbol={'👀'}
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
