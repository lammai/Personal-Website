import React from 'react';
import { Html } from '@react-three/drei';
import { LinkContainer } from '../styling';
import Deer from './models/Deer';

export const Link = ({ position, url, label }) => {
    return (
        <Html
            scale={6}
            position={position}
            transform
            zIndexRange={[100, 0]}
            occlude={Deer}
        >
            <LinkContainer>
                <a href={url}>{label}</a>
            </LinkContainer>
        </Html>
    );
};

export const Text = ({ label, symbol }) => {
    return (
        <LinkContainer>
            <span>
                {label} {symbol}
            </span>
        </LinkContainer>
    );
};

export const Intro = ({ position, intro, currentJob, symbol }) => {
    return (
        <Html scale={5} position={position} transform zIndexRange={[100, 0]}>
            <div>
                <Text label={intro} />
                <Text label={currentJob} symbol={symbol} />
            </div>
        </Html>
    );
};
