import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';

import { setOverflowBody } from '@/helpers';
import { Notification, selectUser, useGetNotificationsQuery } from '@/store';
import { useOnClickOutside } from '@/hooks';
import NotificationItem from '../NotificationItem/NotificationItem';
import Button from '@/components/Buttons/Button/Button';

import styles from './NotificationBlock.module.scss';

const NotificationBlock = ({
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
            avatarSrc={notification.actor.image}
            createdAt={notification?.createdAt}
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
                        transition={{ duration: 0.2 }}
                    >
                        <div className={styles.popoverPanel}>
                            <div className={styles.panelTop}>
                                {isTablet && (
                                    <Button
                                        icon
                                        onClick={() => {
                                            setIsOpen(false);
                                            setOverflowBody();
                                        }}
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                    </Button>
                                )}
                                <h4 className={styles.panelHeadline}>Уведомления</h4>
                                <Button
                                    icon
                                    color="secondary"
                                    className={styles.panelClose}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setOverflowBody();
                                    }}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </Button>
                            </div>
                            <ul className={styles.notificationList}>
                                {!notificationList?.length ? 'Новых уведомлений нет' : notificationList}
                            </ul>
                            {notificationList?.length > limit && (
                                <Button
                                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                    className={styles.buttonMore}
                                    variant="outlined"
                                >
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

export default NotificationBlock;
