import React, { useEffect, useState } from 'react';
import { Button, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { useAuth } from '../../../hooks';
import Heart from '@spectrum-icons/workflow/Heart';
import { useLikeMutation, useRemoveLikeMutation } from '../../../redux';

import styles from './ButtonLike.module.scss';
import { Tippy } from '../../Tippy';

interface IsLikeProps {
    isLiked: boolean | undefined;
    id: string | undefined;
    tooltipPosition?: any;
    width?: string | number;
}

export const ButtonLike: React.FC<IsLikeProps> = ({ isLiked, id, tooltipPosition, width }) => {
    const { user } = useAuth();

    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();

    const [isLike, setLike] = useState<boolean>();

    useEffect(() => {
        setLike(isLiked);
    }, [isLiked]);

    const handleSetLike = () => {
        like(id);
        setLike(true);
    };

    const handleRemoveLike = () => {
        removeLike(id);
        setLike(false);
    };

    if (!user) {
        return (
            <Tippy
                tooltipPosition={tooltipPosition}
                title={'Добавляй в избранное'}
                paragraph={'Чтобы добавлять статьи в понравившиеся, войди в аккаунт.'}>
                <Button
                    variant={isLike ? 'negative' : !isLike && 'accent'}
                    style="fill"
                    UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                    <Heart />
                </Button>
            </Tippy>
        );
    }
    return (
        <TooltipTrigger delay={200} placement={tooltipPosition}>
            <Button
                onPress={isLike ? handleRemoveLike : handleSetLike}
                variant={isLike ? 'secondary' : !isLike && 'accent'}
                style={isLike ? 'outline' : 'fill'}
                UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                <Heart color={isLike ? 'negative' : undefined} />
            </Button>
            <Tooltip>{isLike ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}</Tooltip>
        </TooltipTrigger>
    );
};
