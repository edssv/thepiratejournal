import React, { useEffect, useState } from 'react';
import { Button } from '@adobe/react-spectrum';
import { useAuth } from '../../../hooks';
import Heart from '@spectrum-icons/workflow/Heart';
import {
    useAddBookmarkMutation,
    useLikeMutation,
    useRemoveBookmarkMutation,
    useRemoveLikeMutation,
} from '../../../redux';

import styles from './ButtonBookmark.module.scss';
import { Tippy } from '../../Tippy';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';
import { Tooltip } from 'flowbite-react';

interface IsBookmarkProps {
    hasBookmark: boolean | undefined;
    id: string | undefined;
    tooltipPosition?: any;
    width?: string | number;
}

export const ButtonBookmark: React.FC<IsBookmarkProps> = ({
    hasBookmark,
    id,
    tooltipPosition,
    width,
}) => {
    const { user } = useAuth();

    const [addBookmark] = useAddBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();

    const [bookmark, setBookmark] = useState<boolean>();

    useEffect(() => {
        setBookmark(hasBookmark);
    }, [hasBookmark]);

    const handleSetLike = () => {
        addBookmark(id);
        setBookmark(true);
    };

    const handleRemoveLike = () => {
        removeBookmark(id);
        setBookmark(false);
    };

    if (!user) {
        return (
            <Tippy
                tooltipPosition={tooltipPosition}
                title={'Добавляй в закладки'}
                paragraph={'Чтобы добавлять статьи в закладки, войди в аккаунт.'}>
                <Button
                    variant="secondary"
                    UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                    <BookmarkSingle size="XS" />
                </Button>
            </Tippy>
        );
    }
    return (
        <Tooltip
            placement={tooltipPosition}
            content={bookmark ? 'Убрать из закладок' : 'Добавить в закладки'}>
            <Button
                onPress={bookmark ? handleRemoveLike : handleSetLike}
                variant={bookmark ? 'accent' : 'secondary'}
                style={bookmark ? 'fill' : 'outline'}
                staticColor={bookmark ? 'black' : undefined}
                UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                <BookmarkSingle size="XS" />
            </Button>
        </Tooltip>
    );
};
