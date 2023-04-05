import { useState } from 'react';
import Link from 'next/link';

import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useActions, useAuth } from '@/hooks';
import Button from '@/components/common/Button/Button';
import NotificationButton from '../../NotificationButton/NotificationButton';
import NotificationBlock from '../../NotificationBlock/NotificationBlock';
import styles from './StripMobile.module.scss';

const StripMobile = () => {
  const { setIsOpenHamburgerMenu } = useActions();
  const { user } = useAuth();
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Button onClick={() => setIsOpenHamburgerMenu(true)} icon color="secondary">
          <span className="material-symbols-outlined">menu</span>
        </Button>
        <Link href={getPublicUrl.home()} className={`${styles.logo} icon-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 201" fill="none">
            <rect
              x="0"
              y="32"
              width="72.1994"
              height="129.8"
              rx="36.0997"
              transform="rotate(30 0 0)"
              fill="var(--md-sys-color-primary)"
            />
            <rect
              x="64"
              y="32"
              width="72.1994"
              height="72.1995"
              rx="36.0997"
              transform="rotate(45 75 24.25)"
              fill="var(--md-sys-color-primary)"
            />
          </svg>
        </Link>
      </div>
      <div className={styles.right}>
        {user && (
          <>
            <NotificationButton
              isOpenNotifications={isOpenNotifications}
              setIsOpenNotifications={setIsOpenNotifications}
            />
            <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />
          </>
        )}
      </div>
    </div>
  );
};

export default StripMobile;
