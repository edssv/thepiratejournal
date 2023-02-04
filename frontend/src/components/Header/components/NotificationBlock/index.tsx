import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';
import moment from 'moment';
import 'moment/locale/ru';
import { setOverflowBody } from '../../../../helpers';
import {
    Notification,
    selectUser,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from '../../../../redux';
import { Button, Avatar } from '../../..';
import { useOnClickOutside } from '../../../../hooks';

import styles from './NotificationBlock.module.scss';

interface NotificationItemProps {
    _id: string | undefined;
    avatarSrc: string | undefined;
    username: string | undefined;
    action_key: 'followuser' | 'likearticle' | 'commentarticle' | undefined;
    created_on?: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    _id,
    avatarSrc,
    username,
    action_key,
    created_on,
}) => {
    const [deleteNotification] = useDeleteNotificationMutation();

    const notificationText = () => {
        if (action_key === 'followuser') {
            return 'Подписался на твои обновления';
        }

        if (action_key === 'commentarticle') {
            return 'Прокоментировал твою статью';
        }

        if (action_key === 'likearticle') {
            return 'Оценил твою статью';
        }
    };

    const notificationIcon = () => {
        if (action_key === 'followuser') {
            return <span className="material-symbols-outlined">add_circle</span>;
        }

        if (action_key === 'commentarticle') {
            return <span className="material-symbols-outlined">forum</span>;
        }

        if (action_key === 'likearticle') {
            return <span className="material-symbols-outlined">favorite</span>;
        }
    };

    const time = moment(created_on).fromNow();

    return (
        <li className={styles.notificationListItem}>
            <div className={styles.notificationContainer}>
                <div className={styles.notificationAvatarContainer}>
                    <Link to={`/users/${username}`}>
                        <Avatar imageSrc={avatarSrc} width={48} />
                    </Link>
                    <span className={styles.notificationAvatarIcon}>{notificationIcon()}</span>
                </div>
                <div className={styles.notificationTextContainer}>
                    <Link to={`/users/${username}`} className={styles.notificationUsername}>
                        {username}
                    </Link>
                    <div className={styles.notificationActionText}>{notificationText()}</div>
                    <span className={styles.notificationTimeText}>{time}</span>
                </div>
            </div>
            <Button
                icon
                variant="text"
                color="var(--md-sys-color-secondary-text)"
                onClick={() => deleteNotification(_id)}
                aria-label="Close">
                <span className="material-symbols-outlined">cancel</span>
            </Button>
        </li>
    );
};

export const NotificationBlock = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [currentPage, setCurrentPage] = useState(0);
    const user = useSelector(selectUser);
    const limit = 15;
    useGetNotificationsQuery(`limit=${limit}&page=${currentPage}`);

    const handleClickOutside = () => {
        const hidden = document.body.style.overflow === 'hidden';
        if (hidden) {
            setOverflowBody();
        }
        setIsOpen(false);
    };

    useOnClickOutside(rootRef, handleClickOutside);

    const notificationList = user?.notifications.list.map((notification: Notification, id) => (
        <NotificationItem
            _id={notification._id}
            action_key={notification.action_key}
            username={notification.actor.username}
            avatarSrc={notification.actor.avatar}
            created_on={notification?.created_on}
            key={id}
        />
    ));

    return (
        <AnimatePresence>
            {isOpen && (
                <div ref={rootRef} className={styles.root}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <div className={styles.popoverPanel}>
                            <div className={styles.panelTop}>
                                {isTablet && (
                                    <Button
                                        icon
                                        variant="text"
                                        onClick={() => {
                                            setIsOpen(false);
                                            setOverflowBody();
                                        }}>
                                        <span className="material-symbols-outlined">
                                            arrow_back
                                        </span>
                                    </Button>
                                )}
                                <Button
                                    icon
                                    variant="text"
                                    className={styles.panelClose}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setOverflowBody();
                                    }}>
                                    <span className="material-symbols-outlined">close</span>
                                </Button>
                                <h4 className={styles.panelHeadline}>Уведомления</h4>
                            </div>
                            <ul className={styles.notificationList}>
                                {!notificationList?.length
                                    ? 'Новых уведомлений нет'
                                    : notificationList}
                            </ul>
                            {notificationList?.length > limit && (
                                <Button
                                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                    className={styles.buttonMore}
                                    variant="outlined">
                                    Смотреть еще
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
