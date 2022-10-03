import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NavLink as Link } from 'react-router-dom';
import { FaBars, FaGithub } from 'react-icons/fa';

const colors = {
    dark: 'rgb(29,29,29)',
    light: '#ffffff',
    primary: '#ff3b45',
    bg: 'rgb(244,244,255)',
};

const spacing = {
    md: '16px',
    lg: '32px',
};

const breakpoints = [768];
const mq = breakpoints.map((bp) => `@media (min-width: 48em)`);

export const canvasContainer = css`
    width: 100%;
    height: 100%;
`;

export const Nav = styled.nav`
    background: transparent;
    position: absolute;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* padding: 0.5rem calc((100vw - 1000px) / 2); */
    padding: 0 1.5rem;
    ${mq[0]} {
        padding: 0 3rem;
    }
    transition: 0.3s ease all;
    z-index: 999;
`;

export const LogoContainer = styled(Link)`
    display: block;
    align-items: center;
    text-decoration: none;
    padding: 1rem 1rem;
    height: 100%;
    overflow: hidden;
    max-width: 1920px;
    justify-content: space-between;
    position: relative;
    z-index: 100;
    h2 {
        font-size: 2rem;
        font-weight: bold;
        color: ${colors.light};
        transition: 0.3s ease all;
    }
    h3 {
        font-weight: 400;
        color: ${colors.light};
        transition: 0.3s ease all;
    }
    @media screen and (max-width: 768px) {
        h2 {
            font-size: 1.5rem;
            font-weight: bold;
            color: ${colors.light};
        }
        h3 {
            font-size: 1rem;
            font-weight: 400;
            color: ${colors.light};
        }
    }

    &:hover {
        h2 {
            border: 0.15px;
            border-style: none none solid none;
        }
    }
`;

export const LinksContainer = styled.div`
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-bottom: ${spacing.lg};

    ${mq[0]} {
        flex-direction: row;
        align-items: center;
        margin-bottom: 0;
        margin-right: calc(0.5rem + #${spacing.md});
    }

    a {
        text-decoration: none;
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 2px;
        transition: 0.3s ease all;

        &:hover {
            color: black;
            background-color: #c9c9c9;
        }

        &.active {
            color: ${colors.primary};
        }
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: ${colors.light};

    @media screen and (max-width: 768px) {
        cursor: pointer;
        display: flex;
        position: relative;
        align-items: center;
        font-size: 2rem;
        transform: translate(-50%, 75%);
        transition: 0.3s ease all;

        &:hover {
            color: ${colors.primary};
        }
    }
`;

export const NavMenu = styled.div`
    width: auto;
    height: 100%;
    position: static;

    display: flex;
    align-items: center;
    transform: translate(0);
    transition: 0.3s ease transform;

    @media screen and (max-width: 768px) {
        transform: translate(${(props) => (props.menuOpen ? '100%' : '0%')});
        top: 0;
        right: 100%;
        bottom: 0;
        width: 100%;
        height: 100vh;
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        background: rgba(25, 25, 25, 0.9);
        backdrop-filter: blur(2px);
        div {
            a {
                padding: 2em 3em;
            }
        }
    }
`;

export const Gal = styled.div`
    position: absolute;
    padding: 100px 0;
    height: 100%;
    overflow: auto;
    align-items: center;
    text-align: center;
    align-content: center;
    z-index: 1;
`;
export const ImageContainer = styled.div`
    transition: 0.3s ease all;
    img {
        width: 85%;
        height: auto;
    }
`;

export const ProjectWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const ProjectsDiv = styled.div`
    @media screen and (min-width: 40em) {
        display: -webkit-box;
        flex-wrap: wrap;
        justify-content: center;
        /* justify-content: space-between; */
    }

    position: absolute;
    text-align: center;
    top: 0;

    align-items: center;
    align-content: center;
    padding: 90px 60px;
    height: 100%;
    overflow: auto;
    z-index: 1;
`;

export const ProjectContainer = styled.div`
    flex: 1 0 500px;
    box-sizing: border-box;
    margin: 1rem;
    @media screen and (min-width: 40em) {
        flex: 0 1 calc(50% - 1em);
    }
    @media screen and (min-width: 60em) {
        flex: 0 1 calc(25% - 1.5em);
    }

    position: relative;
    background: #181818;
    width: 320px;
    height: 450px;
    border-radius: 6px;
    transition: all 0.3s cubic-bezier(cubic-bezier(0.25, 0.8, 0.25, 1));
    overflow: hidden;
    &:hover {
        img {
            transform: scale(1.15) translate(0%, -12%);
        }
        div {
            bottom: 0;
        }
    }

    h2 {
        position: absolute;
        bottom: 20px;
        left: 20px;
        margin: 0;
        padding: 0;
        color: #d3faff;
        font-size: 30px;
    }

    img {
        height: 82%;
        width: auto;
        transition: 0.3s;
    }
`;

export const ContentBox = styled.div`
    position: absolute;
    bottom: -55%;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    padding: 30px;
    background-color: #0f0f0f;
    color: white;
    line-height: 1;
    transition: 0.25s;
    p {
        margin: 0 0 20px;
        padding: 0;
        font-size: 18px;
    }
`;

export const TechIconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    svg {
        margin-left: 10px;
    }
`;

export const GithublinkContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 0;
    padding: 10px 30px;
    color: white;
    font-size: 24px;
    cursor: pointer;
`;

export const ProjectGithub = styled(FaGithub)`
    margin-left: 10px;
`;

export const LinkContainer = styled.div`
    padding: 5px 10px;
    background-color: #000000;
    width: max-content;
    height: auto;
    a {
        text-decoration: none;
        color: white;
        font-size: 15px;
    }
    span {
        color: white;
        font-size: 18px;
    }
`;
