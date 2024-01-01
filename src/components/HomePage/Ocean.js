import React, { useMemo, useRef } from 'react';
import { useLoader, useThree, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';

extend({ Water });

export const Ocean = ({
    position = [0, 0, 0],
    rotationX,
    rotationY,
    size,
    sizeY = size,
}) => {
    const ref = useRef();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(
        THREE.TextureLoader,
        '/assets/textures/waternormals.jpg'
    );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(
        () => new THREE.PlaneGeometry(size, sizeY ? sizeY : size),
        []
    );
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
    return (
        <water
            ref={ref}
            args={[geom, config]}
            position={position}
            rotation-x={rotationX}
            rotation-y={rotationY}
        />
    );
};
