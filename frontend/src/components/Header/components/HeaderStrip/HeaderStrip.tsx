import React from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { StripDesktop } from './Desktop/StripDesktop';
import { StripMobile } from './Mobile/StripMobile';

import styles from './HeaderStrip.module.scss';

export const HeaderStrip: React.FC = () => {
    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return <div className={styles.root}>{fromLaptop ? <StripDesktop /> : <StripMobile />}</div>;
};
