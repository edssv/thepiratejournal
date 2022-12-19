import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { ActionButton, Content, Dialog, DialogTrigger, Heading } from '@adobe/react-spectrum';
import { Avatar } from '../../../Avatar';
import {
    Notification,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from '../../../../redux';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import Heart from '@spectrum-icons/workflow/Heart';

import styles from './NotificationBlock.module.scss';

interface NotificationItemProps {
    _id: string | undefined;
    avatarSrc: string | undefined;
    username: string | undefined;
    action_key: 'followuser' | 'likearticle' | undefined;
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
        } else if (action_key === 'likearticle') {
            return 'Оценил твою статью';
        }
    };

    const notificationIcon = () => {
        if (action_key === 'followuser') {
            return <AddCircle color="informative" size="S" />;
        } else if (action_key === 'likearticle') {
            return <Heart color="informative" size="S" />;
        }
    };

    const time = moment(created_on).fromNow();

    return (
        <div className="flex justify-between">
            <div className="flex items-center">
                <div className="inline-block relative shrink-0">
                    <Link to={`/users/${username}`}>
                        <Avatar imageSrc={avatarSrc} width={48} />
                    </Link>
                    <span className="inline-flex absolute right-0 bottom-0 justify-center items-center w-5 h-5 bg-white rounded-full">
                        {notificationIcon()}
                    </span>
                </div>
                <div className="ml-3 text-sm font-normal">
                    <Link to={`/users/${username}`}>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {username}
                        </div>
                    </Link>

                    <div className="text-sm font-normal">{notificationText()}</div>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
                        {time}
                    </span>
                </div>
            </div>
            <div className="flex items-center mb-3">
                <button
                    onClick={() => deleteNotification(_id)}
                    type="button"
                    className="  bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-notification"
                    aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export const NotificationBlock = () => {
    const { data, isLoading } = useGetNotificationsQuery(undefined);

    if (isLoading) {
        return <></>;
    }

    const notificationList = data?.notifications.map((notification: Notification, id) => (
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
        <DialogTrigger type="popover" placement="top right" offset={24} hideArrow>
            <ActionButton isQuiet UNSAFE_style={{ borderRadius: '50%' }}>
                <FaBell size="1.3em" />
            </ActionButton>
            <Dialog UNSAFE_className={styles.dialog}>
                <Heading UNSAFE_className={styles.headline} marginBottom="16px">
                    Уведомления
                </Heading>
                <Content UNSAFE_className={styles.dialogContent}>
                    <div className={styles.notificationList}>
                        {notificationList?.length !== 0
                            ? notificationList
                            : 'Новых уведомлений нет.'}
                    </div>
                </Content>
            </Dialog>
        </DialogTrigger>
    );
};
