import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useMediaPredicate } from 'react-media-hook';
import moment from 'moment';
import 'moment/locale/ru';
import { Button, Avatar } from '../../../../components';
import {
    Notification,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from '../../../../redux';
import { useOnClickOutside } from '../../../../hooks';

import './notificationPopover.scss';
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
        <li className="notificationListItem">
            <div className="notificationContainer">
                <div className="notificationAvatarContainer">
                    <Link to={`/users/${username}`}>
                        <Avatar imageSrc={avatarSrc} width={48} />
                    </Link>
                    <span className="notificationAvatarIcon">{notificationIcon()}</span>
                </div>
                <div className="notificationTextContainer">
                    <Link to={`/users/${username}`} className="notificationUsername">
                        {username}
                    </Link>
                    <div className="notificationActionText">{notificationText()}</div>
                    <span className="notificationTimeText">{time}</span>
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

export const NotificationBlock = () => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();
    const panelRef = useRef<HTMLDivElement>(null);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const { data } = useGetNotificationsQuery(`limit=10&page=0`);

    const setOverflowBody = () => {
        if (document.body.style.overflow === 'hidden') {
            return (document.body.style.overflow = '');
        } else document.body.style.overflow = 'hidden';
    };

    useOnClickOutside(panelRef, setOverflowBody);

    const notificationList = data?.notifications.list.map((notification: Notification, id) => (
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
        <Popover className="notificationPopover">
            <Popover.Button as={Button} icon variant="text" onClick={setOverflowBody}>
                <span className="material-symbols-outlined">notifications</span>
                <div
                    className={`${styles.badge} ${
                        (data?.notifications.totalCount ?? 0) > 999 ? styles.maxCharacterCount : ''
                    }`}>
                    <span className={styles.label}> {data?.notifications.totalCount}</span>
                </div>
            </Popover.Button>
            {ReactDOM.createPortal(
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}>
                    <Popover.Panel ref={panelRef} className="popoverPanel">
                        <div className="panelTop">
                            {isTablet && (
                                <Popover.Button
                                    as={Button}
                                    icon
                                    variant="text"
                                    onClick={setOverflowBody}>
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </Popover.Button>
                            )}
                            <Popover.Button
                                as={Button}
                                icon
                                variant="text"
                                className="panelClose"
                                onClick={setOverflowBody}>
                                <span className="material-symbols-outlined">close</span>
                            </Popover.Button>
                            <h4 className="panelHeadline">Уведомления</h4>
                        </div>
                        <ul className="notificationList">
                            {!notificationList?.length ? 'Новых уведомлений нет' : notificationList}
                        </ul>
                    </Popover.Panel>
                </motion.div>,
                portalRoot,
            )}
        </Popover>
    );
};
