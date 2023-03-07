import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import { Button } from '../../../Buttons';
import { useDeleteNotificationMutation } from '../../../../redux';
import { Avatar } from '../../../Avatar';

import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
    _id: string | undefined;
    avatarSrc: string | undefined;
    username: string | undefined;
    action_key: 'followuser' | 'likearticle' | 'commentarticle' | undefined;
    createdAt?: number;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
    _id,
    avatarSrc,
    username,
    action_key,
    createdAt,
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

    const time = moment(createdAt).fromNow();

    return (
        <li className={styles.notificationListItem}>
            <div className={styles.notificationContainer}>
                <div className={styles.notificationAvatarContainer}>
                    <Link to={`/@${username}`}>
                        <Avatar imageSrc={avatarSrc} width={48} />
                    </Link>
                </div>
                <div className={styles.notificationTextContainer}>
                    <Link to={`/@${username}`} className={styles.notificationUsername}>
                        {username}
                    </Link>
                    <div className={styles.notificationActionText}>{notificationText()}</div>
                    <span className={styles.notificationTimeText}>{time}</span>
                </div>
            </div>
        </li>
    );
};
