import React, { Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
// import { AsphaltPlane } from './components/AsphaltPlane';
// import { Earth } from './components/Earth';
// import { OrbitControls } from '@react-three/drei';
// import { softShadows } from '@react-three/drei';
// import DatGui, { DatNumber } from 'react-dat-gui';
// import '../node_modules/react-dat-gui/dist/dist/index.css';
import { canvasContainer } from '../styling';

export default class Home extends Component {
  // state = {
  //   config: { ...materialConfig },
  // };

  // handleUpdate = (newData) =>
  //   this.setState((prev) => ({
  //     config: { ...prev.config, ...newData },
  //   }));
  render() {
    return (
      <div css={canvasContainer}>
        <Canvas shadows camera={{ position: [0, 0, 4] }}>
          <Suspense fallback={null}>
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshBasicMaterial color='red' />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    );
  }
}
