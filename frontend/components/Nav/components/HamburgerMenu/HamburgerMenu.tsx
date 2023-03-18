'use client';

import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAuth, useThemeMode } from '@/hooks';
import { isOpenHamburgerMenuSelector, setIsOpenHamburgerMenu, useLogoutMutation } from '@/redux';
import { navData } from '@/lib/navData';
import { Button } from '../../../Buttons/Button';
import { Avatar } from '../../../Avatar';

import styles from './HamburgerMenu.module.scss';

export const HamburgerMenu: React.FC = () => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const isOpen = useSelector(isOpenHamburgerMenuSelector);
    const { user } = useAuth();
    const ref = useRef(null);
    const { mode, handleTheme } = useThemeMode();
    const [logout] = useLogoutMutation();
    const currentLocation = location.pathname.split('/')[1];

    const onClickWrite = () => {
        dispatch(setIsOpenHamburgerMenu(false));
        push('/articles/new');
    };

    return (
        <>
            <div ref={ref} className={`${styles.root} ${isOpen ? styles.open : ''}`}>
                <div className={styles.closeAndloginOrCreate}>
                    <Button
                        icon
                        variant="text"
                        color="secondary"
                        onClick={() => dispatch(setIsOpenHamburgerMenu(false))}
                        className={styles.buttonClose}>
                        <span className="material-symbols-outlined">menu_open</span>
                    </Button>
                    {user && (
                        <Button onClick={onClickWrite} variant="filled">
                            Создать статью
                        </Button>
                    )}
                    {!user && (
                        <Button
                            onClick={() => {
                                dispatch(setIsOpenHamburgerMenu(false));
                                push('/login');
                            }}
                            icon
                            variant="filledTonal">
                            <span className="material-symbols-outlined">account_circle</span> Войти
                        </Button>
                    )}
                </div>
                <nav className={styles.nav}>
                    {navData.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link}
                            onClick={() => dispatch(setIsOpenHamburgerMenu(false))}
                            className={`${styles.navLink} ${
                                currentLocation === item.link ? styles.active : ''
                            }`}>
                            <span className="material-symbols-outlined">{item.icon}</span>{' '}
                            {item.label}
                        </Link>
                    ))}
                </nav>
                {user && (
                    <div className={styles.profile}>
                        <Link
                            href={`/@${user.username}`}
                            onClick={() => dispatch(setIsOpenHamburgerMenu(false))}>
                            <div className={styles.avatarAndUsername}>
                                <Avatar imageSrc={user?.avatar} width={38} />
                                <span>{user.username}</span>
                            </div>
                        </Link>
                    </div>
                )}
                {user && (
                    <Button
                        onClick={async () => {
                            dispatch(setIsOpenHamburgerMenu(false));
                            await logout('');
                            push('/login');
                        }}
                        variant="filledTonal"
                        style={{ marginLeft: '16px' }}>
                        Выйти
                    </Button>
                )}
                <div className={styles.switchTheme}>
                    <Button onClick={handleTheme} variant="outlined" color="secondary">
                        {mode === 'dark' ? (
                            <>
                                <span className="material-symbols-outlined">light_mode</span>{' '}
                                Светлая тема
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">dark_mode</span> Темная
                                тема
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div
                onClick={() => dispatch(setIsOpenHamburgerMenu(false))}
                className={`${styles.overlay} ${isOpen ? styles.visible : ''} overlay`}
            />
        </>
    );
};
