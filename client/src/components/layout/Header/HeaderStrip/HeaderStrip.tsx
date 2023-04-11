import StripDesktop from './Desktop/StripDesktop';
import StripMobile from './Mobile/StripMobile';

import styles from './HeaderStrip.module.scss';

const HeaderStrip: React.FC = () => {
  return (
    <div className={styles.root}>
      <StripDesktop /> <StripMobile />
    </div>
  );
};

export default HeaderStrip;
