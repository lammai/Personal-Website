import React, { useMemo, useRef, Suspense } from 'react';
import { useLoader, useThree, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

extend({ Water });

export const Ocean = () => {
    const ref = useRef();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(
        THREE.TextureLoader,
        '/assets/textures/waternormals.jpg'
    );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x08161c,
            distortionScale: 3.7,
            fog: true,
            format: gl.encoding,
        }),
        [waterNormals, gl.encoding]
    );
    useFrame(
        (state, delta) => (ref.current.material.uniforms.time.value += delta)
    );
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
};

export const OceanScene = () => {
    return (
        <>
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
            <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
            <pointLight position={[0, -10, 0]} intensity={1.5} />
            <Suspense fallback={null}>
                <Ocean />
            </Suspense>
        </>
    );
};
