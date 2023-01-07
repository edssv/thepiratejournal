import React, { useState } from 'react';
import { Button, Variant } from '../../../components';
import { useArticle, useAuth } from '../../../hooks';
import { useLikeMutation, useRemoveLikeMutation } from '../../../redux';
import { Tippy } from '../../../components/Tippy';
import { ActionDialog } from '../../../components/Dialogs/ActionDialog';

interface IsLikeProps {
    tooltipPosition?: any;
    width?: string | number;
    variant?: Variant;
    children?: React.ReactNode;
}

export const ButtonLike: React.FC<IsLikeProps> = ({ children, tooltipPosition, variant }) => {
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
                    description="Чтобы добавлять статьи в понравившиеся, войди в аккаунт.">
                    <Button icon variant={variant ?? 'text'} onClick={() => setIsOpen(true)}>
                        <span className="material-symbols-outlined">favorite</span>
                        {children}
                    </Button>
                </Tippy>
            </>
        );
    }
    return (
        <>
            <Button icon onClick={handleLike} variant={variant}>
                <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: isLike ? '"FILL" 1' : '' }}>
                    favorite
                </span>
                {children}
            </Button>

            <ActionDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                actionText={isLike ? 'Добавлено в любимые статьи' : 'Удалено из любимых статей'}
            />
        </>
    );
};
