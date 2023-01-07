import React, { useRef } from 'react';
import { Popover } from '@headlessui/react';
import moment from 'moment';
import 'moment/locale/ru';
import { Button, Avatar } from '../../../../components';
import {
    Notification,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from '../../../../redux';
import { useOnClickOutside } from '../../../../hooks';
import { Link } from 'react-router-dom';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import Heart from '@spectrum-icons/workflow/Heart';
import Comment from '@spectrum-icons/workflow/Comment';

import './notificationPopover.scss';

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
            return <AddCircle color="informative" size="S" />;
        }
        if (action_key === 'commentarticle') {
            return <Comment color="informative" size="S" />;
        }
        if (action_key === 'likearticle') {
            return <Heart color="informative" size="S" />;
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
            <Button icon variant="text" onClick={() => deleteNotification(_id)} aria-label="Close">
                <span className="material-symbols-outlined">cancel</span>
            </Button>
        </li>
    );
};

export const NotificationBlock = () => {
    const panelRef = useRef(null);

    const { data } = useGetNotificationsQuery(undefined);

    const setOverflowBody = () => {
        if (document.body.style.overflow === 'hidden') {
            return (document.body.style.overflow = '');
        } else document.body.style.overflow = 'hidden';
    };

    useOnClickOutside(panelRef, setOverflowBody);

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
        <Popover className="notificationPopover">
            <Popover.Button as={Button} icon variant="text" onClick={setOverflowBody}>
                <span className="material-symbols-outlined">notifications</span>
            </Popover.Button>
            <Popover.Panel ref={panelRef} className="popoverPanel">
                <Popover.Button
                    as={Button}
                    icon
                    variant="text"
                    className="panelClose"
                    onClick={setOverflowBody}>
                    <span className="material-symbols-outlined">close</span>
                </Popover.Button>
                <h4 className="panelHeadline">Уведомления</h4>
                <ul className="notificationList">
                    {notificationList?.length === 0 ? 'Новых уведомлений нет' : notificationList}
                </ul>
            </Popover.Panel>
        </Popover>
    );
};
