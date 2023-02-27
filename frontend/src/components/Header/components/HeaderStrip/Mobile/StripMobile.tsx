import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAuth } from '../../../../../hooks';
import { setIsOpenHamburgerMenu } from '../../../../../redux';
import { Button } from '../../../../Buttons';
import { NotificationBlock, NotificationButton } from '../../';

import logo from '../../../../../assets/img/logotype.png';
import styles from './StripMobile.module.scss';

export const StripMobile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isOpenNotifications, setIsOpenNotifications] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.left}>
                <Button icon variant="text" onClick={() => dispatch(setIsOpenHamburgerMenu(true))}>
                    <span className="material-symbols-outlined">menu</span>
                </Button>
                <Link to="/" className={`${styles.logo} icon-center`}>
                    <img src={logo} alt="The Pirate Journal" />
                </Link>
            </div>
            <div className={styles.right}>
                {user && (
                    <>
                        <NotificationButton
                            isOpenNotifications={isOpenNotifications}
                            setIsOpenNotifications={setIsOpenNotifications}
                        />
                        <NotificationBlock isOpen={isOpenNotifications} setIsOpen={setIsOpenNotifications} />
                    </>
                )}
                <Button icon variant="text" onClick={() => navigate('/search')}>
                    <span className="material-symbols-outlined">search</span>
                </Button>
            </div>
        </div>
    );
};
