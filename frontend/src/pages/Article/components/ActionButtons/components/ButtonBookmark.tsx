import React, { PropsWithChildren, useState } from 'react';
import { Button, Variant, Tippy, Snackbar } from '../../../../../components';
import { useArticle, useAuth } from '../../../../../hooks';
import { useAddBookmarkMutation, useRemoveBookmarkMutation } from '../../../../../redux';

interface IsBookmarkProps {
    tooltipPosition?: any;
    variant?: Variant;
    icon?: boolean;
}

export const ButtonBookmark: React.FC<PropsWithChildren<IsBookmarkProps>> = ({
    tooltipPosition,
    variant,
    children,
    icon = true,
}) => {
    const { user } = useAuth();
    const { article, hasBookmark } = useArticle();

    const [isOpen, setIsOpen] = useState(false);

    const [addBookmark] = useAddBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();

    const handleSetBookmark = async () => {
        if (hasBookmark) {
            await removeBookmark(article._id);
        } else {
            await addBookmark(article._id);
        }

        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
    };

    return (
        <>
            {!user ? (
                <>
                    {' '}
                    <Tippy
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        tooltipPosition={tooltipPosition}
                        title={'Добавляй в закладки'}
                        description={'Чтобы добавлять статьи в закладки, войди в аккаунт.'}
                    >
                        <Button variant={variant ?? 'text'} onClick={() => setIsOpen(true)}>
                            <span className="material-symbols-outlined">bookmark</span> {children}
                        </Button>
                    </Tippy>
                </>
            ) : (
                <>
                    <Button
                        onClick={handleSetBookmark}
                        variant={variant ?? 'text'}
                        style={{ fontVariationSettings: hasBookmark ? '"FILL" 1' : '' }}
                    >
                        <span className="material-symbols-outlined">bookmark</span>
                        {children}
                    </Button>
                    <Snackbar isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {hasBookmark ? 'Добавлено в закладки' : 'Удалено из закладок'}
                    </Snackbar>
                </>
            )}
        </>
    );
};
