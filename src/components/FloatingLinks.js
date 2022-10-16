import React from 'react';
import { Html } from '@react-three/drei';
import { LinkContainer } from '../styling';

export const Link = ({ position, url, label }) => {
    return (
        <Html scale={6} position={position} transform zIndexRange={[100, 0]}>
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
            <Text label={intro} />
            <Text label={currentJob} symbol={symbol} />
        </Html>
    );
};
