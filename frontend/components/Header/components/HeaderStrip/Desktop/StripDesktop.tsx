'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAuth } from '@/hooks';
import { isOpenNavRailSelector, setIsOpenNavRail, useLogoutMutation } from '@/redux';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Buttons/Button';
import { HeaderSkeleton } from '../../HeaderSkeleton';
import { NotificationButton } from '../../NotificationButton';
import { NotificationBlock } from '../../NotificationBlock';
import { SearchBar } from '../../SearchBar/SearchBar';

import logo from '../../../../../assets/img/logotype.png';
import styles from './StripDesktop.module.scss';

export const StripDesktop = () => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAuth();
    const [logout] = useLogoutMutation();
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.navRailOpenContainer}>
                    <Button
                        className={styles.navRailOpen}
                        onClick={() => dispatch(setIsOpenNavRail(!isOpenNavRail))}>
                        <span className="material-symbols-outlined">menu</span>
                    </Button>
                </div>
                <Link href="/" className={`${styles.logo} icon-center`}>
                    <>
                        <Image
                            src={logo}
                            width={50}
                            height={50}
                            style={{ width: 'auto' }}
                            alt="The Pirate Journal"
                        />
                        <span>
                            The Pirate <br /> Journal
                        </span>
                    </>
                </Link>
                {pathname.split('/')[1] !== 'search' && <SearchBar />}
            </div>

            <div className={styles.right}>
                {isLoading ? (
                    <HeaderSkeleton />
                ) : user ? (
                    <>
                        <NotificationButton
                            isOpenNotifications={isOpenNotifications}
                            setIsOpenNotifications={setIsOpenNotifications}
                        />
                        <NotificationBlock
                            isOpen={isOpenNotifications}
                            setIsOpen={setIsOpenNotifications}
                        />
                        <Link href={`/@${user.username}`}>
                            <Avatar imageSrc={user?.avatar} width={32} />
                        </Link>
                        <Button
                            icon
                            color="secondary"
                            variant="text"
                            onClick={async () => {
                                await logout('');
                                router.push('/login');
                            }}>
                            <span className="material-symbols-outlined">logout</span>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => router.push('/login')} icon variant="filledTonal">
                            <span className="material-symbols-outlined">account_circle</span> Войти
                        </Button>
                    </>
                )}{' '}
            </div>
        </div>
    );
};
