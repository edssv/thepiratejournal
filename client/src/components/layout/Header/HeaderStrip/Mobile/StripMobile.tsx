import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useActions, useAuth } from '@/hooks';
import NotificationButton from '../../NotificationButton/NotificationButton';
import NotificationBlock from '../../NotificationBlock/NotificationBlock';

import logo from '@/assets/img/logotype.png';
import styles from './StripMobile.module.scss';
import Button from '@/components/common/Button/Button';

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
                <Link href="/" className={`${styles.logo} icon-center`}>
                    <Image src={logo} width={50} height={50} style={{ width: 'auto' }} alt="The Pirate Journal" />
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
