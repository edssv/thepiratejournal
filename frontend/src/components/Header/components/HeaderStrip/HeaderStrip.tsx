import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import debounce from 'lodash.debounce';

import { useAuth } from '../../../../hooks';
import { useLogoutMutation } from '../../../../redux';
import { Avatar, Button } from '../../..';
import { HeaderSkeleton } from '../HeaderSkeleton';
import { NotificationBlock } from '../NotificationBlock';
import { setOverflowBody } from '../../../../helpers';

import logo from '../../../../assets/img/logotype.png';
import styles from './HeaderStrip.module.scss';

interface OpenStateProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderStrip: React.FC<OpenStateProps> = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [logout] = useLogoutMutation();
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const scrollTop = document.documentElement.scrollTop;
    const [visible, setVisible] = useState(scrollTop < 55);

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible(prevScrollPos > currentScrollPos);

        if (scrollTop > 55 && currentScrollPos > prevScrollPos) {
            setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
    }, 100);

    const notificationButton = () => {
        return (
            <Button
                icon
                variant="text"
                onClick={() => {
                    setIsOpenNotifications(!isOpenNotifications);
                    setOverflowBody();
                }}
            >
                <span className="material-symbols-outlined">notifications</span>
                <div
                    className={`${styles.badge} ${
                        (user?.notifications?.totalCount ?? 0) > 999 ? styles.maxCharacterCount : ''
                    }`}
                >
                    <span className={styles.label}> {user?.notifications?.totalCount}</span>
                </div>
            </Button>
        );
    };

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return (
        <div
            className={`${styles.root} ${open && styles.open}`}
            style={{ transform: visible ? 'translateY(0px)' : 'translateY(-55px)' }}
        >
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
                            </nav>
                        )}
                    </div>
                    <div className={styles.content__right}>
                        {isLoading ? (
                            <HeaderSkeleton />
                        ) : user ? (
                            <>
                                <Button onClick={onClickWrite} variant="filledTonal">
                                    <span className="material-symbols-outlined">edit</span>Создать статью
                                </Button>
                                {notificationButton()}
                                <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />

                                <Link to={`/@${user.username}`}>
                                    <Avatar imageSrc={user?.avatar} width={32} />
                                </Link>

                                <Button
                                    icon
                                    variant="text"
                                    onClick={async () => {
                                        await logout('');
                                        navigate('/login');
                                    }}
                                >
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
                        {user && (
                            <>
                                {notificationButton()}
                                <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />
                            </>
                        )}
                        <Button icon variant="text" onClick={() => navigate('/search')}>
                            <span className="material-symbols-outlined">search</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
