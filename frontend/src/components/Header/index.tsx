import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@adobe/react-spectrum';
import { IoLogOutOutline } from 'react-icons/io5';

import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.jpg';

import styles from './Header.module.scss';
import { useLogoutMutation } from '../../redux/services/auth';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../Avatar';

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const [logout] = useLogoutMutation();

    const imageSrc = auth.user?.avatar;

    const token = localStorage.getItem('token');

    return (
        <header className={styles.root}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.content__left}>
                        <Link to="/" className={styles.logo}>
                            <img src={logo} alt="Логотип" />
                        </Link>
                        {window.innerWidth > 900 && (
                            <nav className={styles.nav}>
                                <NavLink to="/articles" className={styles.nav__link}>
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
                        <Button
                            onPress={() => navigate('/article_edit', { state: { from: location } })}
                            variant="primary">
                            Написать статью
                        </Button>
                        {token ? (
                            <>
                                <Link to="/profile">
                                    <Avatar imageSrc={imageSrc} />
                                </Link>
                                <button
                                    onClick={async () => {
                                        await logout('');
                                        navigate('/login');
                                    }}
                                    className="icon-center">
                                    <IoLogOutOutline color="currentColor" size={24} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button variant="cta">Войти</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
