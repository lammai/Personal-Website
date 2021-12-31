import React from 'react';
import { Gal, ImageContainer } from '../styling';
// import nofuture from '../../public/assets/textures/nofuture.png';
// import nightwalk from '/assets/textures/nightwalk-final-edited.jpg';
// import spooky from '/assets/textures/spooky.png';
// import fog2020 from '/assets/textures/Fog2020-edited.jpg';
// import cardistry2048 from '/assets/textures/cardistry2048.png';

export const Gallery = () => {
  return (
    <Gal>
      <ImageContainer>
        <img src='/assets/textures/nofuture.png' alt='nofure' />
        <img
          src='/assets/textures/nightwalk-final-edited.jpg'
          alt='nightwalk'
        />
        <img src='/assets/textures/spooky.png' alt='spooky' />
        <img src='/assets/textures/Fog2020-edited.jpg' alt='fog2020' />
        <img src='/assets/textures/cardistry2048.png' alt='cardistry2048' />
      </ImageContainer>
    </Gal>
  );
};
