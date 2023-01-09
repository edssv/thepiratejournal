import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { useMediaPredicate } from 'react-media-hook';
import { useAuth, useThemeMode } from '../../../hooks';
import { useLogoutMutation } from '../../../redux';
import { Avatar, Button } from '../../';
import { HeaderSkeleton } from '../HeaderSkeleton';
import logo from '../../../assets/img/logotype.png';
import { OpenStateProps } from '../HamburgerMenu';
import { NotificationBlock } from './NotificationBlock';

import styles from './HeaderStrip.module.scss';

export const HeaderStrip: React.FC<OpenStateProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, isLoading } = useAuth();
    const { mode, handleTheme } = useThemeMode();

    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <div
            className={`${styles.root} ${open && styles.open}`}
            style={{ padding: fromLaptop ? '0 16px' : '' }}>
            {fromLaptop ? (
                <div className={styles.content}>
                    <div className={styles.content__left}>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            <>
                                <img src={logo} alt="The Pirate Journal" />
                                {fromLaptop && (
                                    <span>
                                        The Pirate <br />
                                        Journal
                                    </span>
                                )}
                            </>
                        </Link>
                        {fromLaptop && (
                            <nav className={styles.nav}>
                                <NavLink to="/search" className={styles.nav__link}>
                                    Статьи
                                </NavLink>
                                <NavLink to="/games" className={styles.nav__link}>
                                    Игры
                                </NavLink>
                                <NavLink to="/authors" className={styles.nav__link}>
                                    Авторы
                                </NavLink>
                            </nav>
                        )}
                    </div>
                    <div className={styles.content__right}>
                        {isLoading ? (
                            <HeaderSkeleton />
                        ) : user ? (
                            <>
                                <Button onClick={onClickWrite} variant="filled">
                                    <span className="material-symbols-outlined">edit</span>Создать
                                    статью
                                </Button>

                                <NotificationBlock />

                                <Link to={`/users/${user.username}`}>
                                    <Avatar imageSrc={user?.avatar} width={32} />
                                </Link>

                                <TooltipTrigger delay={200}>
                                    <Button
                                        icon
                                        variant="text"
                                        onClick={async () => {
                                            await logout('');
                                            navigate('/login');
                                        }}>
                                        <span className="material-symbols-outlined">logout</span>
                                    </Button>
                                    <Tooltip placement="bottom">Выйти из аккаунта</Tooltip>
                                </TooltipTrigger>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} variant="filledTonal">
                                    Войти
                                </Button>
                                <Button onClick={() => navigate('/signup')} variant="filled">
                                    Зарегистрироваться
                                </Button>
                            </>
                        )}{' '}
                        {!isLoading && (
                            <Button onClick={handleTheme} icon variant="outlined">
                                {mode === 'dark' ? (
                                    <span className="material-symbols-outlined">light_mode</span>
                                ) : (
                                    <span className="material-symbols-outlined">dark_mode</span>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.mobile}>
                    <div className={styles.left}>
                        <Button icon variant="text" onClick={() => setOpen(!open)}>
                            <span className="material-symbols-outlined">menu</span>
                        </Button>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            <img src={logo} alt="The Pirate Journal" />
                        </Link>
                    </div>
                    <div className={styles.right}>
                        {user && <NotificationBlock />}
                        <Button icon variant="text" onClick={() => navigate('/search')}>
                            <span className="material-symbols-outlined">search</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
