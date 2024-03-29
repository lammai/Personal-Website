import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Deer(props) {
    const group = useRef();
    const { nodes } = useGLTF('/assets/models/deer.glb');
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.grp1_2.geometry}
                material={nodes.grp1_2.material}
                position={props.position}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.024}
            />
        </group>
    );
}

useGLTF.preload('/assets/models/deer.glb');
