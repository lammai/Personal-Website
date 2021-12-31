import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

/**
 * header   Nav
 *  div       logocontainer
 *    h2        logo
 *            bars
 *  nav       navMenu
 *    ul
 *      li...   NavLinks
 *    button
 */

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

export const NavLink = styled(Link)`
  /* color: ${colors.light};
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    background: rgba(${colors.light}, 0.1);
  } */

  /* &.active {
    color: #d9ff00ff;
  } */
`;

export const Bars = styled(FaBars)`
  /* display: none;
  color: ${colors.light};

  @media screen and (max-width: 768px) {
    display: flex;
    position: relative;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  } */
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

  /* ${mq[0]} {
    display: none;
  } */
`;

export const NavMenu = styled.div`
  width: auto;
  height: 100%;
  position: static;

  display: flex;
  align-items: center;
  transform: translate(0);
  /* margin-right: 24px; */

  /* flex-direction: column; */
  /* background: red; */

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
  padding: 100px 0;
  height: 100%;
  overflow: auto;
`;
export const ImageContainer = styled.div`
  display: grid;
  justify-content: center;
  transition: 0.3s ease all;
  img {
    width: 100%;
    height: auto;
    padding: 1.5em 2.5em;
  }
`;
