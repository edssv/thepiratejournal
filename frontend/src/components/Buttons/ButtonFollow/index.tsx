import { Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import { Button } from '@react-spectrum/button';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useFollowMutation, useUnFollowMutation } from '../../../redux';
import { Tippy } from '../../Tippy';
import { ButtonProgress } from '../ButtonProgress';

interface ButtonFollowProps {
    username: string | undefined;
    hasSubscription: boolean | undefined;
}

export const ButtonFollow: React.FC<ButtonFollowProps> = ({ username, hasSubscription }) => {
    const { user } = useAuth();

    const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
    const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation();

    const [isFollow, setIsFollow] = useState<boolean>();

    useEffect(() => {
        setIsFollow(hasSubscription);
    }, [hasSubscription]);

    const onClickButton = () => {
        hasSubscription ? unFollow(username) : follow(username);
        if (isFollow) {
            unFollow(username);
            setIsFollow(false);
        } else {
            follow(username);
            setIsFollow(true);
        }
    };

    if (!user) {
        return (
            <Tippy
                offset={50}
                tooltipPosition="right"
                title="Следи за обновлениями авторов"
                paragraph="Чтобы отслеживать обновления авторов, войди в аккаунт.">
                <Button variant="accent">Подписаться</Button>
            </Tippy>
        );
    }

    return (
        <ButtonProgress
            onPress={onClickButton}
            variant={isFollow ? 'secondary' : 'accent'}
            style="fill">
            {isFollow ? 'Подписка' : 'Подписаться'}
        </ButtonProgress>
    );
};
