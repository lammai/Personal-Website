import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { LinkContainer } from '../styling';

const Link = ({ position, url, label }) => {
  return (
    <Html position={position} center distanceFactor={7} zIndexRange={[100, 0]}>
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
  return (
    <group>
      <mesh {...props}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial wireframe />
        <Html
          position={[-0.12, 1, 0]}
          center
          distanceFactor={7}
          zIndexRange={[100, 0]}
        >
          <Text label={'Hi! My name is Lam'} />
          <Text label={'UW Tacoma grad 2020'} symbol='🎓' />
          <Text label={'Incoming dev @ DocuSign'} symbol='📝' />
        </Html>
        <Link
          position={[1, 0, 0]}
          url={'mailto:lam7.2521@gmail.com'}
          label={'Email'}
        />
        <Link
          position={[-1, 0, 0]}
          url={'https://www.linkedin.com/in/lammal'}
          label={'LinkedIn'}
        />
        <Link
          position={[0, 0, 1]}
          url={'https://github.com/lammai'}
          label={'Github'}
        />
      </mesh>
    </group>
  );
};

export const About = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <LowpolySphere position={[0, 0, 0]} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
