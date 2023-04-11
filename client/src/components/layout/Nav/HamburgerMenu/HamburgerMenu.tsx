import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import { navData } from '@/lib/navData';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useActions, useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import Avatar from '@/components/Avatar/Avatar';

import styles from './HamburgerMenu.module.scss';
import ThemeButton from './ThemeButton/ThemeButton';

const HamburgerMenu: React.FC = () => {
  const { push, pathname } = useRouter();
  const currentLocation = `/${pathname.split('/')[1]}`;

  const ref = useRef(null);
  const { user } = useAuth();
  const isOpen = useTypedSelector((state) => state.ui.isOpenHamburgerMenu);

  const { setIsOpenHamburgerMenu, logout } = useActions();

  const onClickWrite = () => {
    setIsOpenHamburgerMenu(false);
    push(getPublicUrl.articleNew());
  };

  const getTopButton = () => {
    if (user) {
      return (
        <Button onClick={onClickWrite} variant="filled">
          Создать статью
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          setIsOpenHamburgerMenu(false);
          push(getPublicUrl.login());
        }}
        icon
        variant="filledTonal"
      >
        <span className="material-symbols-outlined">account_circle</span> Войти
      </Button>
    );
  };

  return (
    <>
      <div ref={ref} className={clsx(styles.root, isOpen && styles.open)}>
        <div className={styles.closeAndloginOrCreate}>
          <Button
            icon
            variant="text"
            color="secondary"
            onClick={() => setIsOpenHamburgerMenu(false)}
            className={styles.buttonClose}
          >
            <span className="material-symbols-outlined">menu_open</span>
          </Button>
          {getTopButton()}
        </div>
        <nav className={styles.nav}>
          {navData.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              onClick={() => setIsOpenHamburgerMenu(false)}
              className={clsx(styles.navLink, currentLocation === item.link && styles.active)}
            >
              <span className="material-symbols-outlined">{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        {user && (
          <div className={styles.profile}>
            <Link href={getPublicUrl.profile(user.id)} onClick={() => setIsOpenHamburgerMenu(false)}>
              <div className={styles.avatarAndUsername}>
                <Avatar imageSrc={user.image} width={38} />
                <span>{user.username}</span>
              </div>
            </Link>
          </div>
        )}
        {user && (
          <Button
            onClick={() => {
              setIsOpenHamburgerMenu(false);
              logout();
              push(getPublicUrl.login());
            }}
            variant="filledTonal"
            style={{ marginLeft: '16px' }}
          >
            Выйти
          </Button>
        )}
        <div className={styles.themeButtonWrap}>
          <ThemeButton />
        </div>
      </div>
      <div
        onClick={() => setIsOpenHamburgerMenu(false)}
        className={clsx(styles.overlay, isOpen && styles.visible, 'overlay')}
      />
    </>
  );
};

export default HamburgerMenu;
