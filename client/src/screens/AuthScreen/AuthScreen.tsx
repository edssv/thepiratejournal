import clsx from 'clsx';
import Image from 'next/image';

import logo from '@/assets/img/logotype.png';
import { AuthPage } from '@/lib/enums';

import styles from './AuthScreen.module.scss';
import StepsIndicator from './StepsIndicator/StepsIndicator';

interface AuthScreenProps {
  page: AuthPage;
  step?: number;
}

const AuthScreen: React.FC<React.PropsWithChildren<AuthScreenProps>> = ({
  children,
  page,
  step
}) => {
  const getPageTitle = () => {
    if (page === AuthPage.LOGIN) return 'Войти';
    if (page === AuthPage.SIGNUP) return 'Создать аккаунт';

    return null;
  };

  return (
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
          {page === AuthPage.SIGNUP && <StepsIndicator step={step} />}
          <h1 className={styles.title}>{getPageTitle()}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
