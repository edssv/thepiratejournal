import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useAppDispatch, useAuth } from '@/hooks';
import { setIsOpenHamburgerMenu } from '@/store';
import NotificationButton from '../../NotificationButton/NotificationButton';
import NotificationBlock from '../../NotificationBlock/NotificationBlock';

import logo from '@/assets/img/logotype.png';
import styles from './StripMobile.module.scss';

const StripMobile = () => {
    const dispatch = useAppDispatch();
    const { user } = useAuth();
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
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
