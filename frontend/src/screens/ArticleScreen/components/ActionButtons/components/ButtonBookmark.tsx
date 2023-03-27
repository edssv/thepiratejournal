import React, { PropsWithChildren, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { useAuth } from '@/hooks';
import { articleDataSelector, useAddBookmarkMutation, useRemoveBookmarkMutation, viewerSelector } from '@/store';
import Button, { Variant } from '@/components/Buttons/Button/Button';
import Snackbar from '@/components/Snackbar/Snackbar';

interface IsBookmarkProps {
    tooltipPosition?: any;
    variant?: Variant;
    icon?: boolean;
}

const Tippy = dynamic(() => import('@/components/Tippy/Tippy'), { ssr: false });

export const ButtonBookmark: React.FC<PropsWithChildren<IsBookmarkProps>> = ({
    tooltipPosition,
    variant,
    children,
    icon = true,
}) => {
    const { user } = useAuth();
    const article = useSelector(articleDataSelector);
    const { hasBookmark } = useSelector(viewerSelector);

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
