import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { navData } from '@/lib/navData';
import { useActions, useAuth, useThemeMode } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import Avatar from '@/components/Avatar/Avatar';

import styles from './HamburgerMenu.module.scss';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const HamburgerMenu: React.FC = () => {
    const { push, pathname } = useRouter();
    const { setIsOpenHamburgerMenu, logout } = useActions();
    const isOpen = useTypedSelector((state) => state.ui.isOpenHamburgerMenu);
    const { user } = useAuth();
    const ref = useRef(null);
    const { mode, handleTheme } = useThemeMode();
    const currentLocation = pathname.split('/')[1];

    const onClickWrite = () => {
        setIsOpenHamburgerMenu(false);
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
                        onClick={() => setIsOpenHamburgerMenu(false)}
                        className={styles.buttonClose}
                    >
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
                                setIsOpenHamburgerMenu(false);
                                push('/login');
                            }}
                            icon
                            variant="filledTonal"
                        >
                            <span className="material-symbols-outlined">account_circle</span> Войти
                        </Button>
                    )}
                </div>
                <nav className={styles.nav}>
                    {navData.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link}
                            onClick={() => setIsOpenHamburgerMenu(false)}
                            className={`${styles.navLink} ${currentLocation === item.link ? styles.active : ''}`}
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
                            push('/login');
                        }}
                        variant="filledTonal"
                        style={{ marginLeft: '16px' }}
                    >
                        Выйти
                    </Button>
                )}
                <div className={styles.switchTheme}>
                    <Button onClick={handleTheme} variant="outlined" color="secondary">
                        {mode === 'dark' ? (
                            <>
                                <span className="material-symbols-outlined">light_mode</span> Светлая тема
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">dark_mode</span> Темная тема
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div
                onClick={() => setIsOpenHamburgerMenu(false)}
                className={`${styles.overlay} ${isOpen ? styles.visible : ''} overlay`}
            />
        </>
    );
};

export default HamburgerMenu;
