import React from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import styles from './HeaderStrip.module.scss';
// import StripDesktop from './Desktop/StripDesktop';
// import StripMobile from './Mobile/StripMobile';
import dynamic from 'next/dynamic';

const StripDesktop = dynamic(() => import('./desktop/StripDesktop'), { ssr: false });
const StripMobile = dynamic(() => import('./mobile/StripMobile'), { ssr: false });

const HeaderStrip: React.FC = () => {
  const fromLaptop = useMediaPredicate('(min-width: 991px)');

  return (
    <div className={styles.root}>
      <StripDesktop /> <StripMobile />
    </div>
  );
};

export default HeaderStrip;
