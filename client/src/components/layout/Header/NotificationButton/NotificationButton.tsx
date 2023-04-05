import { setOverflowBody } from '@/helpers';
import { useAuth } from '@/hooks';
import Button from '@/components/common/Button/Button';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    isOpenNotifications: boolean;
    setIsOpenNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ isOpenNotifications, setIsOpenNotifications }) => {
    const { user } = useAuth();

    return (
        <div className={styles.root}>
            <Button
                icon
                color="secondary"
                onClick={() => {
                    setIsOpenNotifications(!isOpenNotifications);
                    setOverflowBody();
                }}
            >
                <span className="material-symbols-outlined">notifications</span>
            </Button>

            {/* {(user?.notifications?.totalCount ?? 0) > 0 && (
                <div
                    className={`${styles.badge} ${
                        (user?.notifications?.totalCount ?? 0) > 999 ? styles.maxCharacterCount : ''
                    }`}
                >
                    {' '}
                    <span className={styles.label}> {user?.notifications?.totalCount}</span>
                </div>
            )} */}
        </div>
    );
};

export default NotificationButton;