import clsx from 'clsx';
import Image from 'next/image';

import logo from '@/assets/img/logotype.png';

import styles from './AuthScreen.module.scss';

const AuthScreen: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.logoAndText}>
        <div className={styles.logoWrapper}>
          <Image alt='Logo' className={styles.logo} height={42} src={logo.src} width={42} />
          <span className={styles.text}>The Pirate Journal</span>
        </div>
      </div>
      <div className={clsx(styles.item, styles.panel)}>
        <div className={clsx(styles.logoWrapper, 'icon-center')}>
          <Image alt='Logo' className={styles.logo} height={24} src={logo.src} width={24} />
          <span className={styles.text}>The Pirate Journal</span>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthScreen;
