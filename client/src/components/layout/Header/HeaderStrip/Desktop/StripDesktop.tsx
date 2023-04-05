import { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { useActions, useAuth } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import Avatar from '@/components/Avatar/Avatar';
import SearchBar from '../../SearchBar/SearchBar';
import NotificationButton from '../../NotificationButton/NotificationButton';

import logo from '@/assets/img/logotype.png';
import styles from './StripDesktop.module.scss';

const StripDesktop = () => {
  const { pathname, push } = useRouter();

  const { user } = useAuth();
  const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  const { logout, setIsOpenNavRail } = useActions();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.navRailOpenContainer}>
          <Button className={styles.navRailOpen} onClick={() => setIsOpenNavRail(!isOpenNavRail)}>
            <span className="material-symbols-outlined">{isOpenNavRail ? 'menu_open' : 'menu'}</span>
          </Button>
        </div>
        <Link href="/" className={clsx(styles.logo, 'icon-center')}>
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 201" fill="none">
              <rect
                x="0"
                y="32"
                width="72.1994"
                height="129.8"
                rx="36.0997"
                transform="rotate(30 0 0)"
                fill="var(--md-sys-color-on-surface)"
              />
              <rect
                x="64"
                y="32"
                width="72.1994"
                height="72.1995"
                rx="36.0997"
                transform="rotate(45 75 24.25)"
                fill="var(--md-sys-color-on-surface)"
              />
            </svg>
            <span>The Pirate Journal</span>
          </>
        </Link>
        {pathname.split('/')[1] !== 'search' && <SearchBar />}
      </div>

      <div className={styles.right}>
        {user ? (
          <>
            {/* <NotificationButton
                            isOpenNotifications={isOpenNotifications}
                            setIsOpenNotifications={setIsOpenNotifications}
                        /> */}
            {/* <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} /> */}
            <Link href={getPublicUrl.profile(user.id)}>
              <Avatar imageSrc={user?.image} width={32} />
            </Link>
            <Button
              icon
              color="secondary"
              variant="text"
              onClick={() => {
                try {
                  logout();
                  push('/login');
                } catch (error) {}
              }}
            >
              <span className="material-symbols-outlined">logout</span>
            </Button>
          </>
        ) : (
          <Button onClick={() => push('/login')} icon variant="filledTonal" color="secondary">
            <span className="material-symbols-outlined">account_circle</span>Войти
          </Button>
        )}
      </div>
    </div>
  );
};

export default StripDesktop;
