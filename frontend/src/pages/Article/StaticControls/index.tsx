import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
    useAddBookmarkMutation,
    useDeleteArticleMutation,
    useLikeMutation,
    useRemoveBookmarkMutation,
    useRemoveLikeMutation,
} from '../../../redux';
import { ButtonLike } from '../Buttons';
import { ActionDialog, Button } from '../../../components';
import { useArticle, useAuth } from '../../../hooks';

import styles from './StaticControls.module.scss';

interface StaticControlsProps {
    isOwner: boolean | undefined;
}

export const StaticControls: React.FC<StaticControlsProps> = ({ isOwner }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useAuth();
    const { article, isLike, hasBookmark } = useArticle();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenTippy, setIsOpenTippy] = useState<boolean>(false);
    const [actionText, setIsActionText] = useState<string>('');

    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();
    const [addBookmark] = useAddBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();
    const [deleteArticle] = useDeleteArticleMutation();

    const fromPage = location?.state?.from?.pathname;

    const handleSetLike = async () => {
        if (!isLike) {
            await like(article._id);
            setIsActionText('Добавлено в любимые статьи');
        } else {
            await removeLike(article._id);
            setIsActionText('Удалено из любимых статей');
        }
    };

    const handleSetBookmark = async () => {
        if (!hasBookmark) {
            await addBookmark(article._id);
            setIsActionText('Добавлено в закладки');
        } else {
            await removeBookmark(article._id);
            setIsActionText('Удалено из закладок');
        }
    };

    const handleDeleteArticle = () => {
        deleteArticle(article._id);
        navigate(fromPage ? fromPage : '/');
    };

    const items = [
        {
            icon: 'favorite',
            label: isLike ? 'Добавлено' : 'Добавить в любимые',
            action: 'like',
            active: isLike,
        },
        {
            icon: 'bookmark',
            label: hasBookmark ? 'Сохранено в закладках' : 'Добавить в закладки',
            action: 'bookmark',
            active: hasBookmark,
        },
        { icon: 'share', label: 'Поделиться', action: 'share' },
        { icon: 'edit', label: 'Редактировать', action: 'edit' },
        { icon: 'delete', label: 'Удалить', action: 'delete' },
    ];

    const menuList = (isOwner ? [...items] : [items[0], items[1], items[2]]).map((item, i) => (
        <div
            key={i}
            onClick={async () => {
                setIsOpen(false);
                item.action === 'delete'
                    ? handleDeleteArticle()
                    : item.action === 'edit'
                    ? navigate(`/articles/${article._id}/edit`, {
                          state: { from: location },
                      })
                    : item.action === 'like'
                    ? await handleSetLike()
                    : item.action === 'bookmark'
                    ? await handleSetBookmark()
                    : setIsOpen(false);
                setIsOpenTippy(true);
                setTimeout(() => setIsOpenTippy(false), 3000);
            }}
            className={`MenuDropdownItem ${item.active ? 'active' : ''}`}>
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
        </div>
    ));

    return (
        <div className={styles.root}>
            <div className={styles.buttonGroup}>
                <div className={styles.controls}>
                    <ButtonLike variant="filledTonal">{article.likes.count}</ButtonLike>
                </div>
                <Button icon variant="filledTonal">
                    <span className="material-symbols-outlined">share</span>
                </Button>
                {user && (
                    <>
                        <Button
                            icon
                            variant="filledTonal"
                            onClick={() => {
                                setIsOpen((isOpen) => !isOpen);
                            }}>
                            <span className="material-symbols-outlined">more_horiz</span>
                        </Button>
                        <Transition appear={true} show={isOpen} as={Fragment}>
                            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Dialog.Overlay className="MenuDropdownOverlay" />
                                </Transition.Child>
                                <Transition.Child
                                    appear={true}
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel>
                                        <div className="MenuDropdownItems elevation-2">
                                            {menuList}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </Dialog>
                        </Transition>
                    </>
                )}
            </div>
            <ActionDialog isOpen={isOpenTippy} setIsOpen={setIsOpenTippy} actionText={actionText} />
        </div>
    );
};
