import { Button } from '@react-spectrum/button';
import React, { useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { useLogoutMutation } from '../../../redux';
import { Flex, Text } from '@adobe/react-spectrum';

import styles from './HamburgerMenu.module.scss';

import Draw from '@spectrum-icons/workflow/Draw';
import { Avatar } from '../../Avatar';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

export interface OpenStateProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HamburgerMenu: React.FC<OpenStateProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));

    const [logout] = useLogoutMutation();

    const onClickWrite = () => {
        setOpen(false);
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <div ref={ref} className={`${styles.root} ${open ? styles.open : ''}`}>
            <div className={styles.closeAndloginOrCreate}>
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
                {user ? (
                    <>
                        <Button onPress={onClickWrite} variant="secondary">
                            <Text>Создать статью</Text>
                        </Button>
                    </>
                ) : (
                    <Button
                        href="/login"
                        onPress={() => setOpen(false)}
                        elementType="a"
                        variant="accent"
                        style="outline">
                        Войти
                    </Button>
                )}
            </div>

            <nav className={styles.nav}>
                <NavLink to="/search" onClick={() => setOpen(false)} className={styles.nav__link}>
                    Статьи
                </NavLink>
                <NavLink to="/games" onClick={() => setOpen(false)} className={styles.nav__link}>
                    Игры
                </NavLink>
                <NavLink to="/authors" onClick={() => setOpen(false)} className={styles.nav__link}>
                    Авторы
                </NavLink>
            </nav>

            {user && (
                <div className={styles.profile}>
                    <Link to={`/users/${user.username}`} onClick={() => setOpen(false)}>
                        <Flex gap="14px" alignItems="center">
                            <Avatar imageSrc={user?.avatar} />
                            <span>{user.username}</span>
                        </Flex>
                    </Link>
                </div>
            )}

            {user ? (
                <Button
                    onPress={async () => {
                        setOpen(false);
                        await logout('');
                        navigate('/login');
                    }}
                    variant="cta"
                    marginStart="16px">
                    Выйти
                </Button>
            ) : (
                <Button
                    onPress={async () => {
                        setOpen(false);
                        navigate('/signup');
                    }}
                    variant="cta"
                    marginStart="16px">
                    Регистрация
                </Button>
            )}
        </div>
    );
};
