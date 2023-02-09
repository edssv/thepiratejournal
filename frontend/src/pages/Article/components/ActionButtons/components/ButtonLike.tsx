import React, { PropsWithChildren, useState } from 'react';
import { ActionDialog, Button, Variant, Tippy } from '../../../../../components';
import { useArticle, useAuth } from '../../../../../hooks';
import { useLikeMutation, useRemoveLikeMutation } from '../../../../../redux';

interface IsLikeProps {
    tooltipPosition?: any;
    width?: string | number;
    variant?: Variant;
    color?: string;
    icon?: boolean;
}

export const ButtonLike: React.FC<PropsWithChildren<IsLikeProps>> = ({
    children,
    tooltipPosition,
    variant = 'text',
    color,
    icon = true,
}) => {
    const { user } = useAuth();
    const { article, isLike } = useArticle();

    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLike = async () => {
        if (isLike) {
            await removeLike(article._id);
        } else {
            await like(article._id);
        }

        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
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
                    <Button icon variant={variant} onClick={() => setIsOpen(true)}>
                        <span className="material-symbols-outlined">favorite</span>
                        {children}
                    </Button>
                </Tippy>
            </>
        );
    }
    return (
        <>
            <Button icon={icon} onClick={handleLike} color={color} variant={variant}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isLike ? '"FILL" 1' : '' }}>
                    favorite
                </span>
                {children ?? null}
            </Button>

            <ActionDialog
                isOpen={isOpen}
                actionText={isLike ? 'Добавлено в любимые статьи' : 'Удалено из любимых статей'}
            />
        </>
    );
};
