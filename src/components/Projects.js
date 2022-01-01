import React, { Suspense } from 'react';
import {
  ProjectContainer,
  ProjectsDiv,
  ProjectGithub,
  ContentBox,
  TechIconContainer,
  GithublinkContainer,
  ProjectWrapper,
} from '../styling';
import { FaJava, FaReact, FaBootstrap, FaFilePdf } from 'react-icons/fa';
import { SiReactrouter, SiFlask, SiPostgresql, SiHeroku } from 'react-icons/si';
import { Canvas } from '@react-three/fiber';
import { Ocean } from './HomePage/Ocean';
import { Html } from '@react-three/drei';

const ProjectComponent = ({
  image,
  title,
  description,
  technologies,
  githubLink,
}) => {
  const openLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener, noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <ProjectContainer>
      <h2>{title}</h2>
      <img src={image} alt='projectImage' />
      <ContentBox>
        <p>{description}</p>
        <GithublinkContainer>
          <span>Github: </span>
          <ProjectGithub onClick={() => openLink(githubLink)} />
        </GithublinkContainer>
        <TechIconContainer>
          <span>Tech: </span>
          {technologies.map((tech) => {
            const Icon = tech;
            return <Icon key={String(tech)} />;
          })}
        </TechIconContainer>
      </ContentBox>
    </ProjectContainer>
  );
};

export const Projects = () => {
  return (
    <>
      <ProjectWrapper>
        <ProjectsDiv>
          <ProjectComponent
            image='/assets/textures/Fract.gif'
            title='FractalFX'
            description='Generate Mandelbrot and Julia sets. This was my introduction to JavaFX.'
            technologies={[FaJava]}
            githubLink='https://github.com/lammai/FractalFX'
          />
          <ProjectComponent
            image='/assets/textures/sigmameals.png'
            title='SigmaMeals'
            description='Recipe website with an emphasis on budget.'
            technologies={[
              FaReact,
              FaBootstrap,
              SiReactrouter,
              SiFlask,
              SiPostgresql,
              SiHeroku,
            ]}
            githubLink='https://github.com/Abdulqdir/SigmaMeals'
          />
          <ProjectComponent
            image='/assets/textures/highlightCombiner.png'
            title='Highlight Combiner'
            description='Visually combine different highlights on the same PDF document.'
            technologies={[FaJava, FaFilePdf]}
            githubLink='https://github.com/treguv/dubhacks2020'
          />
          <ProjectComponent
            image='/assets/textures/calc.gif'
            title='Calculator'
            description='Calculations/conversions for Binary, Hexadecimal, and Bandwidth.'
            technologies={[FaJava]}
            githubLink='https://github.com/lammai/handyCalculator'
          />
        </ProjectsDiv>
      </ProjectWrapper>
      <Canvas camera={{ position: [-72, 72, 72], fov: 60 }}>
        <Suspense fallback={<Html center>Loading...</Html>}>
          {/* <fog attach='fog' args={['#212121', -324, 420]} /> */}
          <ambientLight intensity={0.9} />
          <directionalLight intensity={1.5} position={[2.5, 8, 5]} />
          <pointLight position={[-10, 0, -20]} color='red' intensity={2.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <Ocean />
        </Suspense>
      </Canvas>
    </>
  );
};
