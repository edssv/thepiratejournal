import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAuth } from '../../../../../hooks';
import { isOpenNavRailSelector, setIsOpenNavRail, useLogoutMutation } from '../../../../../redux';
import { Avatar } from '../../../../Avatar';
import { Button } from '../../../../Buttons';
import { HeaderSkeleton, NotificationBlock, NotificationButton, SearchBar } from '../../';

import logo from '../../../../../assets/img/logotype.png';
import styles from './StripDesktop.module.scss';

export const StripDesktop = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const [logout] = useLogoutMutation();
    const isOpenNavRail = useSelector(isOpenNavRailSelector);
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    const onClickWrite = () => {
        navigate('/articles/new', { state: { from: location } });
    };

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <div className={styles.navRailOpenContainer}>
                    <Button className={styles.navRailOpen} onClick={() => dispatch(setIsOpenNavRail(!isOpenNavRail))}>
                        <span className="material-symbols-outlined">menu</span>
                    </Button>
                </div>
                <Link to="/" className={`${styles.logo} icon-center`}>
                    <>
                        <img src={logo} alt="The Pirate Journal" />
                        <span>The Pirate Journal</span>
                    </>
                </Link>
                {location.pathname.split('/')[1] !== 'search' && <SearchBar />}
            </div>

            <div className={styles.right}>
                {isLoading ? (
                    <HeaderSkeleton />
                ) : user ? (
                    <>
                        <Button onClick={onClickWrite} variant="filledTonal">
                            <span className="material-symbols-outlined">edit</span>Создать статью
                        </Button>
                        <NotificationButton
                            isOpenNotifications={isOpenNotifications}
                            setIsOpenNotifications={setIsOpenNotifications}
                        />
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
    );
};
