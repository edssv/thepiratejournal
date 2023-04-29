import styles from './Header.module.scss';
import HeaderStrip from './HeaderStrip/HeaderStrip';

const Header: React.FC = () => (
  <header className={styles.root} id='header'>
    <HeaderStrip />
  </header>
);

export default Header;
