import { Button } from '@react-spectrum/button';
import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { useLogoutMutation } from '../../../redux';
import { Divider, Flex, Text } from '@adobe/react-spectrum';

import styles from './HeaderMobile.module.scss';

import Draw from '@spectrum-icons/workflow/Draw';
import Search from '@spectrum-icons/workflow/Search';
import { Avatar } from '../../Avatar';
import logo from '../../../assets/img/logotype.png';

export const HeaderMobile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [open, setOpen] = useState<boolean>(false);

    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <div className={styles.root}>
            <div className={styles.fixed}>
                {open && (
                    <div className={styles.hamburgerMenu}>
                        <div className={styles.loginOrCreate}>
                            {user ? (
                                <>
                                    <Button onPress={onClickWrite} variant="secondary">
                                        <Draw />
                                        <Text>Создать статью</Text>
                                    </Button>
                                </>
                            ) : (
                                <Button href="/login" elementType="a" variant="cta" style="outline">
                                    Войти
                                </Button>
                            )}
                        </div>
                        <Divider size="S" />
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

                        <div className={styles.profile}>
                            {user && (
                                <Link to={`/users/${user.username}`}>
                                    <Flex gap="14px" alignItems="center">
                                        <Avatar imageSrc={user?.avatar} />
                                        <span>{user.username}</span>
                                    </Flex>
                                </Link>
                            )}
                        </div>
                        <Divider size="S" />
                        {user && (
                            <Button
                                onPress={async () => {
                                    await logout('');
                                    navigate('/login');
                                }}
                                variant="cta"
                                style="outline"
                                marginStart="16px">
                                Выйти
                            </Button>
                        )}
                    </div>
                )}
                <div className={styles.strip}>
                    <div className={styles.stripLeft}>
                        <button
                            onClick={() => setOpen(!open)}
                            className={`${styles.hamburgerMenuActivate} ${
                                open ? styles.open : ''
                            }`}>
                            <div className={styles.hamburgerButton}>
                                <div className={styles.hamburgerLine}></div>
                                <div className={styles.hamburgerLine}></div>
                                <div className={styles.hamburgerLine}></div>
                            </div>
                        </button>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            <img src={logo} alt="The Pirate Journal" />
                        </Link>
                    </div>
                    <div className={styles.stripRight}>
                        <Link to="/search">
                            <Search size="S" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
