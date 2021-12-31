import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Hallway = React.forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials } = useGLTF('/assets/models/hallway.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.001']}
        scale={[12.35, 21, 150]}
        position={[props.args[0], props.args[1], props.args[2]]}
      />
    </group>
  );
});

useGLTF.preload('/hallway.glb');
export default Hallway;
