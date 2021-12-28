import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Bars,
  NavMenu,
  LogoContainer,
  LinksContainer,
} from '../../styling';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <LogoContainer to='/'>
        <h2>Logo</h2>
      </LogoContainer>
      <NavMenu menuOpen={menuOpen}>
        <LinksContainer>
          <NavLink to='/works'>Works</NavLink>
          <NavLink to='/experiments'>Experiments</NavLink>
          <NavLink to='/gallery'>Gallery</NavLink>
          <NavLink to='/about'>About</NavLink>
        </LinksContainer>
      </NavMenu>
      <Bars onClick={() => setMenuOpen(!menuOpen)} />
    </Nav>
  );
};

export default Navbar;
