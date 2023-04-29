import StripDesktop from './Desktop/StripDesktop';
import styles from './HeaderStrip.module.scss';
import StripMobile from './Mobile/StripMobile';

const HeaderStrip: React.FC = () => (
  <div className={styles.root}>
    <StripDesktop /> <StripMobile />
  </div>
);

export default HeaderStrip;
