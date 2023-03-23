import React from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import styles from './HeaderStrip.module.scss';
import StripDesktop from './Desktop/StripDesktop';
import StripMobile from './Mobile/StripMobile';

const HeaderStrip: React.FC = () => {
    const fromLaptop = useMediaPredicate('(min-width: 991px)');
    // const fromLaptop = useMediaQuery('(min-width: 991px)');

    return <div className={styles.root}>{fromLaptop ? <StripDesktop /> : <StripMobile />}</div>;
};

export default HeaderStrip;
