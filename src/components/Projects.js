import React from 'react';
import {
    ProjectContainer,
    ProjectsDiv,
    ProjectGithub,
    ContentBox,
    TechIconContainer,
    GithublinkContainer,
    ProjectWrapper,
} from '../styling';
import {
    FaJava,
    FaReact,
    FaBootstrap,
    FaFilePdf,
    FaNodeJs,
    FaAndroid,
} from 'react-icons/fa';
import {
    SiReactrouter,
    SiFlask,
    SiPostgresql,
    SiHeroku,
    SiJavascript,
} from 'react-icons/si';
import { Canvas } from '@react-three/fiber';
import { Ocean } from './HomePage/Ocean';

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
            <img src={image} alt="projectImage" />
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
                        image="/assets/textures/sigmagrind.gif"
                        title="SigmaGrind 🗿"
                        description="Web game based on the Megaman X series with slightly different movement mechanics. Made with ❤ in a group of four as part of TCSS 491."
                        technologies={[SiJavascript]}
                        githubLink="https://github.com/apotafiy/sigma-grind"
                    />
                    <ProjectComponent
                        image="/assets/textures/chatterbug.gif"
                        title="🐞 ChatterBug"
                        description="Android messaging app with weather forecast functionality. Class project for TCSS 450, developed in a group of five."
                        technologies={[
                            FaAndroid,
                            FaJava,
                            FaNodeJs,
                            SiPostgresql,
                            SiHeroku,
                        ]}
                        githubLink="https://github.com/TCSS450-Team7-MobileApp"
                    />
                    <ProjectComponent
                        image="/assets/textures/Fract.gif"
                        title="FractalFX"
                        description="Fractal explorer application made with JavaFX as an introduction to GUI programming with Java. Generate Mandelbrot and Julia fractals."
                        technologies={[FaJava]}
                        githubLink="https://github.com/lammai/FractalFX"
                    />
                    <ProjectComponent
                        image="/assets/textures/sigmameals.png"
                        title="SigmaMeals"
                        description="Recipe website with an emphasis on budget. Designed and developed for TCSS 445 as a class project in a group of four."
                        technologies={[
                            FaReact,
                            FaBootstrap,
                            SiReactrouter,
                            SiFlask,
                            SiPostgresql,
                            SiHeroku,
                        ]}
                        githubLink="https://github.com/Abdulqdir/SigmaMeals"
                    />
                    <ProjectComponent
                        image="/assets/textures/highlightCombiner.png"
                        title="Highlight Combiner"
                        description="Visually combine highlights on multiple PDF documents onto one PDF. Developed with a group of four over the course of two days. Dubhacks 2020."
                        technologies={[FaJava, FaFilePdf]}
                        githubLink="https://github.com/treguv/dubhacks2020"
                    />
                    <ProjectComponent
                        image="/assets/textures/calc.gif"
                        title="🤷‍♂️ Calculator"
                        description="Calculations/conversions for Binary, Hexadecimal, and Bandwidth which able to compute extremely large inputs. Over-engineered for TCSS 305."
                        technologies={[FaJava]}
                        githubLink="https://github.com/lammai/handyCalculator"
                    />
                </ProjectsDiv>
            </ProjectWrapper>
            <Canvas camera={{ position: [-72, 72, 72], fov: 60 }}>
                <Ocean rotationX={-Math.PI / 2} rotationY={0} size={1500} />
            </Canvas>
        </>
    );
};
