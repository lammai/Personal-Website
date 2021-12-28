import { css } from '@emotion/react';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
// import { AsphaltPlane } from './components/AsphaltPlane';
// import { Earth } from './components/Earth';
// import { OrbitControls } from '@react-three/drei';
// import { softShadows } from '@react-three/drei';
// import DatGui, { DatNumber } from 'react-dat-gui';
// import '../node_modules/react-dat-gui/dist/dist/index.css';

//Dat GUI

const style = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(180, 196, 207, 75)
  );
`;

export default class App extends React.Component {
  // state = {
  //   config: { ...materialConfig },
  // };

  // handleUpdate = (newData) =>
  //   this.setState((prev) => ({
  //     config: { ...prev.config, ...newData },
  //   }));

  render() {
    return (
      <div css={style}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
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
