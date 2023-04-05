import dynamic from 'next/dynamic';

import styles from './HeaderStrip.module.scss';

const StripDesktop = dynamic(() => import('./Desktop/StripDesktop'), { ssr: false });
const StripMobile = dynamic(() => import('./Mobile/StripMobile'), { ssr: false });

const HeaderStrip: React.FC = () => {
  return (
    <div className={styles.root}>
      <StripDesktop /> <StripMobile />
    </div>
  );
};

export default HeaderStrip;
