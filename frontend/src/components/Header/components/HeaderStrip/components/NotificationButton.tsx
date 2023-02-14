import React from 'react';

import { setOverflowBody } from '../../../../../helpers';
import { useAuth } from '../../../../../hooks';
import { Button } from '../../../../Buttons';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    isOpenNotifications: boolean;
    setIsOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
    isOpenNotifications,
    setIsOpenNotifications,
}) => {
    const { user, isLoading } = useAuth();

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
