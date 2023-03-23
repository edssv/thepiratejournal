import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAuth } from '@/hooks';
import { isOpenNavRailSelector, setIsOpenNavRail, useLogoutMutation } from '@/store';
import Button from '@/components/Buttons/Button/Button';
import HeaderSkeleton from '../../HeaderSkeleton';
import SearchBar from '../../SearchBar/SearchBar';
import NotificationButton from '../../NotificationButton/NotificationButton';
import NotificationBlock from '../../NotificationBlock/NotificationBlock';
import Avatar from '@/components/Avatar/Avatar';

import logo from '@/assets/img/logotype.png';
import styles from './StripDesktop.module.scss';
import { signOut } from 'next-auth/react';

const StripDesktop = () => {
    const { pathname, push } = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAuth();
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.navRailOpenContainer}>
                    <Button className={styles.navRailOpen} onClick={() => dispatch(setIsOpenNavRail(!isOpenNavRail))}>
                        <span className="material-symbols-outlined">menu</span>
                    </Button>
                </div>
                <Link href="/" className={`${styles.logo} icon-center`}>
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
                {isAuthenticated ? (
                    <>
                        <NotificationButton
                            isOpenNotifications={isOpenNotifications}
                            setIsOpenNotifications={setIsOpenNotifications}
                        />
                        <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />
                        {/* <Link href={`/@${user.username}`}>
                            <Avatar imageSrc={user?.image} width={32} />
                        </Link> */}
                        <Button
                            icon
                            color="secondary"
                            variant="text"
                            onClick={async () => {
                                signOut({ redirect: true, callbackUrl: '/login' });
                            }}
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => push('/login')} icon variant="filledTonal">
                            <span className="material-symbols-outlined">account_circle</span> Войти
                        </Button>
                    </>
                )}{' '}
            </div>
        </div>
    );
};

export default StripDesktop;
