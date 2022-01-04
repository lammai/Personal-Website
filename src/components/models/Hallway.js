import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Hallway(props, ref) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/assets/models/hallway.glb');
  return (
    <group ref={group} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.001']}
        // scale={[12.35, 18, 150]}
        scale={props.scale}
        // position={[props.args[0], props.args[1], props.args[2]]}
        position={props.position}
      />
    </group>
  );
}

useGLTF.preload('/assets/models/hallway.glb');
