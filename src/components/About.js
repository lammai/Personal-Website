import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { LinkContainer } from '../styling';
// import { useControls } from 'leva';

const Link = ({ position, url, label }) => {
    return (
        <Html
            position={position}
            center
            distanceFactor={7}
            zIndexRange={[100, 0]}
        >
            <LinkContainer>
                <a href={url}>{label}</a>
            </LinkContainer>
        </Html>
    );
};

const Text = ({ label, symbol }) => {
    return (
        <LinkContainer>
            <span>
                {label} {symbol}
            </span>
        </LinkContainer>
    );
};

const LowpolySphere = (props) => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        sphereRef.current.rotation.y = clock.getElapsedTime() / 10;
    });
    return (
        <group>
            <mesh ref={sphereRef} {...props}>
                <icosahedronGeometry args={[2, 0]} />
                <meshBasicMaterial wireframe />
                <Html
                    position={[0, 2, 0]}
                    // position={[0, 0, -2]}
                    center
                    distanceFactor={7}
                    zIndexRange={[100, 0]}
                >
                    <Text label={'Hi! 👋 My name is Lam'} />
                    <Text label={'Software Engineer @ DocuSign'} symbol="📝" />
                </Html>
                <Link
                    position={[2, 0, 0]}
                    url={'mailto:lam7.2521@gmail.com'}
                    label={'Email 📨'}
                />
                <Link
                    position={[-2, 0, 0]}
                    url={'https://www.linkedin.com/in/lammal'}
                    label={'🔗 LinkedIn'}
                />
                <Link
                    position={[0, 0, 2]}
                    url={'https://github.com/lammai'}
                    label={'Github 🔀'}
                />
            </mesh>
        </group>
    );
};

export const About = () => {
    return (
        <Canvas>
            <OrbitControls enableZoom={false} enablePan={false} />
            <Suspense fallback={null}>
                <LowpolySphere position={[0, 0, 0]} rotation={[0.15, 0, 0]} />
            </Suspense>
        </Canvas>
    );
};
