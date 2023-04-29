import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/common/Button/Button';
import { useActions, useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { navData } from '@/lib/navData';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

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
        <Button variant='filled' onClick={onClickWrite}>
          Создать статью
        </Button>
      );
    }

    return (
      <Button
        icon
        variant='filledTonal'
        onClick={() => {
          setIsOpenHamburgerMenu(false);
          push(getPublicUrl.login());
        }}
      >
        <span className='material-symbols-outlined'>account_circle</span> Войти
      </Button>
    );
  };

  return (
    <>
      <div ref={ref} className={clsx(styles.root, isOpen && styles.open)}>
        <div className={styles.closeAndloginOrCreate}>
          <Button
            icon
            className={styles.buttonClose}
            color='secondary'
            variant='text'
            onClick={() => setIsOpenHamburgerMenu(false)}
          >
            <span className='material-symbols-outlined'>menu_open</span>
          </Button>
          {getTopButton()}
        </div>
        <nav className={styles.nav}>
          {navData.map((item, i) => (
            <Link
              key={i}
              className={clsx(styles.navLink, currentLocation === item.link && styles.active)}
              href={item.link}
              onClick={() => setIsOpenHamburgerMenu(false)}
            >
              <span className='material-symbols-outlined'>{item.icon}</span> {item.label}
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
            style={{ marginLeft: '16px' }}
            variant='filledTonal'
            onClick={() => {
              setIsOpenHamburgerMenu(false);
              logout();
              push(getPublicUrl.login());
            }}
          >
            Выйти
          </Button>
        )}
        <div className={styles.themeButtonWrap}>
          <ThemeButton />
        </div>
      </div>
      <div
        aria-hidden='true'
        className={clsx(styles.overlay, isOpen && styles.visible, 'overlay')}
        onClick={() => setIsOpenHamburgerMenu(false)}
      />
    </>
  );
};

export default HamburgerMenu;
