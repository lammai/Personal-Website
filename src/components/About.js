import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { LinkContainer } from '../styling';

const Link = ({ url, label }) => {
  return (
    <LinkContainer>
      <a href={url}>{label}</a>
    </LinkContainer>
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
        <Html position={[-0.5, 1.7, 0]}>
          <Text label={'Hi! My name is Lam'} />
          <Text label={'Student at UW Tacoma, Grad 2022'} symbol='🎓' />
          <Text label={'Incoming developer @ DocuSign'} symbol='📝' />
        </Html>
        <Html position={[1, 0, 0]}>
          <Link url={'mailto:lam7.2521@gmail.com'} label={'Email'} />
        </Html>
        <Html position={[-1, 0, 0]}>
          <Link url={'https://www.linkedin.com/in/lammal'} label={'LinkedIn'} />
        </Html>
        <Html position={[0, 0, 1]}>
          <Link url={'https://github.com/lammai'} label={'Github'} />
        </Html>
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
