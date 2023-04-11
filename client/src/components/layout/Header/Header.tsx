import HeaderStrip from './HeaderStrip/HeaderStrip';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header id="header" className={styles.root}>
      <HeaderStrip />
    </header>
  );
};

export default Header;
