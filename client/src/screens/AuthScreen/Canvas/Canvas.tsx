import Image from 'next/image';
import clsx from 'clsx';

import logo from '@/assets/img/logotype.png';
import styles from './Canvas.module.scss';

const Canvas: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.root}>
      <section className={styles.background}>
        <div className={styles.inner}>
          <div className={styles.logoAndSpan}>
            <div className={styles.logo__wrapper}>
              <Image width={80} height={80} className={styles.logo} src={logo.src} alt="Logo" />
              <h2 className={styles.logo__text}>
                The Pirate <br /> Journal
              </h2>
            </div>
            <p>Войдите или создайте учетную запись</p>
          </div>
          <div className={clsx(styles.item, styles.panel)}>{children}</div>
        </div>
      </section>
    </div>
  );
};

export default Canvas;
