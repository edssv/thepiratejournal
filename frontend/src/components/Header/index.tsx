import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    ActionButton,
    Button,
    ButtonGroup,
    Text,
    Tooltip,
    TooltipTrigger,
} from '@adobe/react-spectrum';
import Draw from '@spectrum-icons/workflow/Draw';

import logo from '../../assets/img/logotype.png';

import styles from './Header.module.scss';
import { useLogoutMutation } from '../../redux/services/auth';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../Avatar';
import { HeaderSkeleton } from './HeaderSkeleton';
import { useMediaPredicate } from 'react-media-hook';
import LogOut from '@spectrum-icons/workflow/LogOut';

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();

    const [logout] = useLogoutMutation();

    const imageSrc = user?.avatar;

    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');
    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <header
            className={styles.root}
            style={
                window.screenTop > 55
                    ? { boxShadow: 'rgba(0, 0, 0, 0.2) 0px -2px 6px ' }
                    : { boxShadow: 'unset' }
            }>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.content__left}>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            {isMobile ? (
                                <img src={logo} alt="The Pirate Journal" />
                            ) : (
                                <>
                                    <img src={logo} alt="The Pirate Journal" />
                                    <span>
                                        The Pirate <br />
                                        Journal
                                    </span>
                                </>
                            )}
                        </Link>
                        {fromLaptop && (
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
                        {fromLaptop ? (
                            <Button onPress={onClickWrite} variant="secondary">
                                <Draw />
                                <Text>Создать статью</Text>
                            </Button>
                        ) : (
                            <ActionButton
                                onPress={onClickWrite}
                                isQuiet
                                UNSAFE_style={{ borderRadius: '50%' }}>
                                <Draw />
                            </ActionButton>
                        )}

                        {isLoading ? (
                            <HeaderSkeleton />
                        ) : user ? (
                            <>
                                <Link to={`/users/${user.username}`}>
                                    <Avatar imageSrc={imageSrc} />
                                </Link>
                                <TooltipTrigger delay={200}>
                                    <ActionButton
                                        onPress={async () => {
                                            await logout('');
                                            navigate('/login');
                                        }}
                                        isQuiet
                                        UNSAFE_style={{ borderRadius: '50%' }}>
                                        <LogOut />
                                    </ActionButton>
                                    <Tooltip placement="bottom">Выйти из аккаунта</Tooltip>
                                </TooltipTrigger>
                            </>
                        ) : (
                            <Button href="/login" elementType="a" variant="cta">
                                Войти
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
