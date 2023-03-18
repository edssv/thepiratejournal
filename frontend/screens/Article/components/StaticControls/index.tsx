import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    articleDataSelector,
    useAddBookmarkMutation,
    useDeleteArticleMutation,
    useLikeMutation,
    useRemoveBookmarkMutation,
    useRemoveLikeMutation,
    viewerSelector,
} from '@/redux';
import { ButtonLike } from '../ActionButtons/components';
import { useArticle, useAuth } from '@/hooks';

import styles from './StaticControls.module.scss';
import { useSelector } from 'react-redux';
import { Button } from '@/components/Buttons/Button';
import { Snackbar } from '@/components/Snackbar';
import { useRouter } from 'next/navigation';

interface StaticControlsProps {
    isOwner: boolean | undefined;
}

export const StaticControls: React.FC<StaticControlsProps> = ({ isOwner }) => {
    const { push } = useRouter();

    const data = useSelector(articleDataSelector);
    const { isLike, hasBookmark } = useSelector(viewerSelector);

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenTippy, setIsOpenTippy] = useState<boolean>(false);
    const [actionText, setIsActionText] = useState<string>('');

    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();
    const [addBookmark] = useAddBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();
    const [deleteArticle] = useDeleteArticleMutation();

    const handleSetLike = async () => {
        if (!isLike) {
            await like(data._id);
            setIsActionText('Добавлено в любимые статьи');
        } else {
            await removeLike(data._id);
            setIsActionText('Удалено из любимых статей');
        }
    };

    const handleSetBookmark = async () => {
        if (!hasBookmark) {
            await addBookmark(data._id);
            setIsActionText('Добавлено в закладки');
        } else {
            await removeBookmark(data._id);
            setIsActionText('Удалено из закладок');
        }
    };

    const handleDeleteArticle = () => {
        deleteArticle(data._id);
        push('/');
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
                    ? push(`/articles/${data._id}/edit`)
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
                    <ButtonLike variant="filledTonal">
                        {'likesCount' in data && data.likesCount}
                    </ButtonLike>
                </div>
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
                        <AnimatePresence>
                            {isOpen && (
                                <Dialog
                                    open={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    className="MenuDropdown">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}>
                                        <Dialog.Overlay className="MenuDropdownOverlay" />
                                    </motion.div>
                                    <motion.div exit={{ y: 250 }}>
                                        <Dialog.Panel className="MenuDropdownPanel">
                                            <div className="MenuDropdownItems elevation-2">
                                                {menuList}
                                            </div>
                                        </Dialog.Panel>
                                    </motion.div>
                                </Dialog>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
            <Snackbar isOpen={isOpenTippy} onClose={() => setIsOpenTippy(false)}>
                {actionText}
            </Snackbar>
        </div>
    );
};
