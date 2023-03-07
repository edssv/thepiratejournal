import React, { PropsWithChildren, useState } from 'react';

import { Snackbar, Button, Variant, Tippy, ButtonColor } from '../../../../../components';
import { useArticle, useAuth } from '../../../../../hooks';
import { useLikeMutation, useRemoveLikeMutation } from '../../../../../redux';

interface IsLikeProps {
    tooltipPosition?: any;
    width?: string | number;
    variant?: Variant;
    color?: ButtonColor;
    icon?: boolean;
}

export const ButtonLike: React.FC<PropsWithChildren<IsLikeProps>> = ({
    children,
    tooltipPosition,
    variant = 'text',
    color,
    icon = false,
}) => {
    const { user } = useAuth();
    const { article, isLike } = useArticle();
    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLike = async () => {
        if (isLike) {
            await removeLike(article._id);
        } else {
            await like(article._id);
        }

        setIsOpen(true);
    };

    if (!user) {
        return (
            <>
                <Tippy
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    tooltipPosition={tooltipPosition}
                    title={'Добавляй в избранное'}
                    description="Чтобы добавлять статьи в понравившиеся, войди в аккаунт."
                >
                    <Button onClick={() => setIsOpen(!isOpen)} isActive={isOpen} variant={variant}>
                        <span className="material-symbols-outlined">favorite</span>
                        {children}
                    </Button>
                </Tippy>
            </>
        );
    }
    return (
        <>
            <Button onClick={handleLike} color={color} variant={variant}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isLike ? '"FILL" 1' : '' }}>
                    favorite
                </span>
                {children ?? null}
            </Button>

            <Snackbar isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {isLike ? 'Добавлено в любимые статьи' : 'Удалено из любимых статей'}
            </Snackbar>
        </>
    );
};
