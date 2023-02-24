import React, { useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAuth, useThemeMode } from '../../../../hooks';
import { useLogoutMutation } from '../../../../redux';
import { Avatar, Button } from '../../..';

import styles from './HamburgerMenu.module.scss';

interface OpenStateProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navListData = [
    { href: '', text: 'Дом', icon: 'home' },
    { href: '/search', text: 'Статьи', icon: 'book' },
    { href: '/games', text: 'Игры', icon: 'stadia_controller' },
    { href: '/authors', text: 'Авторы', icon: 'diversity_1' },
];

export const HamburgerMenu: React.FC<OpenStateProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const ref = useRef(null);
    const { mode, handleTheme } = useThemeMode();
    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        setOpen(false);
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <>
            <div ref={ref} className={`${styles.root}  ${open && styles.open}`}>
                <div className={styles.closeAndloginOrCreate}>
                    <Button icon variant="text" onClick={() => setOpen(!open)} className={styles.buttonClose}>
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
                                setOpen(false);
                                navigate('/login');
                            }}
                            variant="filledTonal"
                        >
                            Войти
                        </Button>
                    )}
                </div>
                <nav className={styles.nav}>
                    {navListData.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.href}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                [styles.nav__link, isActive ? styles.active : ''].filter(Boolean).join(' ')
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span> {item.text}
                        </NavLink>
                    ))}
                </nav>
                {user && (
                    <div className={styles.profile}>
                        <Link to={`/@${user.username}`} onClick={() => setOpen(false)}>
                            <div className={styles.avatarAndUsername}>
                                <Avatar imageSrc={user?.avatar} width={38} />
                                <span>{user.username}</span>
                            </div>
                        </Link>
                    </div>
                )}
                {user ? (
                    <Button
                        onClick={async () => {
                            setOpen(false);
                            await logout('');
                            navigate('/login');
                        }}
                        variant="filledTonal"
                        style={{ marginLeft: '16px' }}
                    >
                        Выйти
                    </Button>
                ) : (
                    <Button
                        onClick={async () => {
                            setOpen(false);
                            navigate('/signup');
                        }}
                        variant="filled"
                        style={{ marginLeft: '16px' }}
                    >
                        Регистрация
                    </Button>
                )}
                <div className={styles.switchTheme}>
                    <Button onClick={handleTheme} variant="outlined">
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
        </>
    );
};
