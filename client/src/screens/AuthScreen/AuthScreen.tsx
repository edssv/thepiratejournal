import { useTheme } from 'next-themes';
import Link from 'next/link';

import { useGoogleLoginMutation } from '@/services/auth/auth.service';
import { AuthPage } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import logo from '@/assets/img/logotype.png';
import styles from './AuthScreen.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

interface AuthScreenProps {
  page: AuthPage;
}

const AuthScreen: React.FC<React.PropsWithChildren<AuthScreenProps>> = ({ children, page }) => {
  const getPageTitle = () => {
    if (page === AuthPage.LOGIN) return 'Войти';
    if (page === AuthPage.SIGNUP) return 'Создать аккаунт';
  };

  const getHelperText = () => {
    if (page === AuthPage.LOGIN) {
      return (
        <>
          Новый пользователь? <Link href={getPublicUrl.signup()}>Создать аккаунт</Link>
        </>
      );
    }
    if (page === AuthPage.SIGNUP) {
      return (
        <>
          Уже есть аккаунт? <Link href={getPublicUrl.login()}>Войти</Link>
        </>
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.logoAndText}>
          <div className={styles.logoWrapper}>
            <Image width={42} height={42} className={styles.logo} src={logo.src} alt="Logo" />
            <span className={styles.text}>The Pirate Journal</span>
          </div>
        </div>
        <div className={clsx(styles.item, styles.panel)}>
          <div className={clsx(styles.logoWrapper, 'icon-center')}>
            <Image width={24} height={24} className={styles.logo} src={logo.src} alt="Logo" />
            <span className={styles.text}>The Pirate Journal</span>
          </div>
          <h1 className={styles.title}>{getPageTitle()}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
