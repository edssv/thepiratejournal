import React, { useEffect, useState } from 'react';
import {
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Heading,
    Tooltip,
    TooltipTrigger,
} from '@adobe/react-spectrum';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import Heart from '@spectrum-icons/workflow/Heart';
import { useLikeMutation, useRemoveLikeMutation } from '../../../redux/services/article';

import styles from './ButtonLike.module.scss';

interface IsLikeProps {
    isLiked: boolean | undefined;
    id: string | undefined;
    tooltipPosition?: any;
    width?: string | number;
}

export const ButtonLike: React.FC<IsLikeProps> = ({ isLiked, id, tooltipPosition, width }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
            <DialogTrigger type="popover" mobileType="tray" placement={tooltipPosition}>
                <Button
                    variant={isLike ? 'negative' : !isLike && 'accent'}
                    style="fill"
                    UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                    <Heart />
                </Button>
                {(close) => (
                    <Dialog>
                        <Heading>Добавляй в избранное</Heading>
                        <Content>
                            <p>Чтобы добавлять статьи в понравившиеся, войди в аккаунт.</p>
                        </Content>
                        <ButtonGroup>
                            <Button onPress={close} variant="secondary" staticColor="white">
                                Не сейчас
                            </Button>
                            <Button
                                onPress={() =>
                                    navigate('/login', {
                                        state: { from: location },
                                    })
                                }
                                variant="accent"
                                staticColor="white">
                                Войти
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                )}
            </DialogTrigger>
        );
    }
    return (
        <TooltipTrigger delay={200} placement={tooltipPosition}>
            <Button
                onPress={isLike ? handleRemoveLike : handleSetLike}
                variant={isLike ? 'negative' : !isLike && 'accent'}
                style="fill"
                UNSAFE_style={{ width: width, height: width, borderRadius: '50%' }}>
                <Heart />
            </Button>
            <Tooltip>Добавить в понравившиеся</Tooltip>
        </TooltipTrigger>
    );
};
