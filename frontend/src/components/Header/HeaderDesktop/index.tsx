import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { useLogoutMutation } from '../../../redux';
import { Avatar } from '../../Avatar';
import { HeaderSkeleton } from '../HeaderSkeleton';
import {
    ActionButton,
    Button,
    ButtonGroup,
    Text,
    Tooltip,
    TooltipTrigger,
} from '@adobe/react-spectrum';

import styles from './HeaderDesktop.module.scss';

import LogOut from '@spectrum-icons/workflow/LogOut';
import Draw from '@spectrum-icons/workflow/Draw';
import logo from '../../../assets/img/logotype.png';

export const HeaderDesktop = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, isLoading } = useAuth();

    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <div className="container">
            {' '}
            <div className={styles.root}>
                <div className={styles.content}>
                    <div className={styles.content__left}>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            <>
                                <img src={logo} alt="The Pirate Journal" />
                                <span>
                                    The Pirate <br />
                                    Journal
                                </span>
                            </>
                        </Link>
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
                    </div>
                    <div className={styles.content__right}>
                        {isLoading ? (
                            <HeaderSkeleton />
                        ) : user ? (
                            <>
                                <Button onPress={onClickWrite} variant="secondary">
                                    <Draw />
                                    <Text>Создать статью</Text>
                                </Button>

                                <Link to={`/users/${user.username}`}>
                                    <Avatar imageSrc={user?.avatar} />
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
                            <ButtonGroup>
                                <Button href="/login" elementType="a" variant="cta" style="outline">
                                    Войти
                                </Button>
                                <Button href="/login" elementType="a" variant="cta">
                                    Зарегистрироваться
                                </Button>
                            </ButtonGroup>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
