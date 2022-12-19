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
import { useMediaPredicate } from 'react-media-hook';

import styles from './HeaderStrip.module.scss';

import { IoLogOutOutline } from 'react-icons/io5';
import Draw from '@spectrum-icons/workflow/Draw';
import logo from '../../../assets/img/logotype.png';
import { OpenStateProps } from '../HamburgerMenu';
import Search from '@spectrum-icons/workflow/Search';
import { NotificationBlock } from './NotificationBlock';

export const HeaderStrip: React.FC<OpenStateProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, isLoading } = useAuth();

    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    const isLaptop = useMediaPredicate('(max-width: 990.98px)');
    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <div
            className={`${styles.root} ${open ? styles.open : ''}`}
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
                                <Button onPress={onClickWrite} variant="secondary">
                                    <Draw />
                                    <Text>Создать статью</Text>
                                </Button>

                                <NotificationBlock />

                                <Link to={`/users/${user.username}`}>
                                    <Avatar imageSrc={user?.avatar} width={32} />
                                </Link>

                                <TooltipTrigger delay={200}>
                                    <ActionButton
                                        onPress={async () => {
                                            await logout('');
                                            navigate('/login');
                                        }}
                                        isQuiet
                                        UNSAFE_style={{ borderRadius: '50%' }}>
                                        <IoLogOutOutline size="1.6em" />
                                    </ActionButton>
                                    <Tooltip placement="bottom">Выйти из аккаунта</Tooltip>
                                </TooltipTrigger>
                            </>
                        ) : (
                            <ButtonGroup>
                                <Button
                                    href="/login"
                                    elementType="a"
                                    variant="accent"
                                    style="outline">
                                    Войти
                                </Button>
                                <Button href="/signup" elementType="a" variant="accent">
                                    Зарегистрироваться
                                </Button>
                            </ButtonGroup>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.mobile}>
                    <div className={styles.left}>
                        <button
                            onClick={() => setOpen(!open)}
                            className={`hamburgerMenuActivate
                                ${open ? 'open' : ''}
                            `}>
                            <div className="hamburgerButton">
                                <div className="hamburgerLine"></div>
                                <div className="hamburgerLine"></div>
                                <div className="hamburgerLine"></div>
                            </div>
                        </button>
                        <Link to="/" className={`${styles.logo} icon-center`}>
                            <img src={logo} alt="The Pirate Journal" />
                        </Link>
                    </div>
                    <div className={styles.right}>
                        {user && <NotificationBlock />}
                        <Link to="/search">
                            <Search size="S" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
