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
    const { logout, setIsOpenNavRail } = useActions();

    const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.navRailOpenContainer}>
                    <Button className={styles.navRailOpen} onClick={() => setIsOpenNavRail(!isOpenNavRail)}>
                        <span className="material-symbols-outlined">menu</span>
                    </Button>
                </div>
                <Link href="/" className={clsx(styles.logo, 'icon-center')}>
                    <>
                        <Image src={logo} width={50} height={50} style={{ width: 'auto' }} alt="The Pirate Journal" />
                        <span>
                            The Pirate <br /> Journal
                        </span>
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
