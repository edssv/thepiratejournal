import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';
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

    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const scrollTop = document.documentElement.scrollTop;

    const [visible, setVisible] = useState(scrollTop < 55);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible(prevScrollPos > currentScrollPos);

        if (scrollTop > 55 && currentScrollPos > prevScrollPos) {
            setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
    }, 100);

    // useEffect(() => {
    //     const isArticlePage = location.pathname.split('/')[1] === 'articles';

    //     if (isArticlePage) {
    //         window.addEventListener('scroll', handleScroll);
    //     }

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [prevScrollPos, visible, handleScroll]);

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <div
            className={`${styles.root} ${open && styles.open}`}
            style={{ transform: visible ? 'translateY(0px)' : 'translateY(-55px)' }}>
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
                                <Button onClick={onClickWrite} variant="filledTonal">
                                    <span className="material-symbols-outlined">edit</span>Создать
                                    статью
                                </Button>

                                <NotificationBlock />

                                <Link to={`/users/${user.username}`}>
                                    <Avatar imageSrc={user?.avatar} width={32} />
                                </Link>

                                <Button
                                    icon
                                    variant="text"
                                    onClick={async () => {
                                        await logout('');
                                        navigate('/login');
                                    }}>
                                    <span className="material-symbols-outlined">logout</span>
                                </Button>
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
                                    <motion.div
                                        animate={{ translateY: 0 }}
                                        style={{
                                            translateY: 15,
                                            height: '20px',
                                        }}>
                                        <span className="material-symbols-outlined">
                                            light_mode
                                        </span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        animate={{ translateY: 0 }}
                                        style={{ translateY: -15, height: '20px' }}>
                                        <span className="material-symbols-outlined">dark_mode</span>
                                    </motion.div>
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
