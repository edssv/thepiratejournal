import React, { PropsWithChildren, useState } from 'react';
import { Tippy, Button, Variant, ButtonColor } from '../../../../../components';
import { useArticle, useAuth } from '../../../../../hooks';
import { useLikeCommentMutation, useRemoveLikeCommentMutation } from '../../../../../redux';

interface IsLikeProps {
    commentId: string;
    isLike: boolean;
    tooltipPosition?: any;
    width?: string | number;
    variant?: Variant;
    color?: ButtonColor;
    index: number;
}

export const ButtonLike: React.FC<PropsWithChildren<IsLikeProps>> = ({
    commentId,
    isLike,
    children,
    tooltipPosition,
    variant,
    color,
    index,
}) => {
    const { user } = useAuth();
    const { article } = useArticle();

    const [isOpen, setIsOpen] = useState(false);

    const [likeComment] = useLikeCommentMutation();
    const [removeLikeComment] = useRemoveLikeCommentMutation();

    const handleLike = () => {
        if (isLike) {
            removeLikeComment({ commentId, articleId: article._id, index });
        } else {
            likeComment({ commentId, articleId: article._id, index });
        }
    };

    if (!user) {
        return (
            <>
                <Tippy
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    tooltipPosition={tooltipPosition}
                    title={'Оценивай комментарии'}
                    description="Чтобы оценить комментарий, войди в аккаунт."
                >
                    <Button icon onClick={() => setIsOpen(true)} color={color}>
                        <span className="material-symbols-outlined">favorite</span>
                        {children ?? null}
                    </Button>
                </Tippy>
            </>
        );
    }
    return (
        <>
            <Button icon onClick={handleLike} variant={variant} color={color}>
                <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: isLike ? '"FILL" 1' : '"FILL" 0' }}
                >
                    favorite
                </span>
                {children ?? null}
            </Button>
        </>
    );
};
