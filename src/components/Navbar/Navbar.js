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
      <LogoContainer onClick={() => setMenuOpen(false)} to='/'>
        <h2>Lam Mai</h2>
        <h3>Developer | 3D Artist</h3>
      </LogoContainer>
      <NavMenu menuOpen={menuOpen}>
        <LinksContainer>
          <NavLink onClick={() => setMenuOpen(false)} to='/projects'>
            Projects
          </NavLink>
          {/* <NavLink onClick={() => setMenuOpen(false)} to='/experiments'>
            Experiments
          </NavLink> */}
          <NavLink onClick={() => setMenuOpen(false)} to='/gallery'>
            Gallery
          </NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to='/about'>
            About
          </NavLink>
        </LinksContainer>
      </NavMenu>
      <Bars onClick={() => setMenuOpen(!menuOpen)} />
    </Nav>
  );
};

export default Navbar;
