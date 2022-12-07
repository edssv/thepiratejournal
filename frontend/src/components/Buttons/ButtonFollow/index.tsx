import { Button } from '@react-spectrum/button';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import { useFollowMutation, useUnFollowMutation } from '../../../redux';
import { Tippy } from '../../Tippy';
import { ButtonProgress } from '../ButtonProgress';
import AddCircle from '@spectrum-icons/workflow/AddCircle';
import Bell from '@spectrum-icons/workflow/Bell';

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
        if (hasSubscription) {
            setIsFollow(false);
            unFollow(username);
        } else {
            setIsFollow(true);
            follow(username);
        }
    };

    if (!user) {
        return (
            <Tippy
                offset={50}
                tooltipPosition="right"
                title="Следи за обновлениями авторов"
                paragraph="Чтобы отслеживать обновления авторов, войди в аккаунт.">
                <Button variant="accent"></Button>
            </Tippy>
        );
    }

    return (
        <ButtonProgress
            onPress={onClickButton}
            variant={isFollow ? 'secondary' : 'accent'}
            style="fill">
            {isFollow ? (
                <>
                    <span>Подписка</span>
                    <Bell marginStart="8px" />
                </>
            ) : (
                <>
                    <AddCircle marginEnd="8px" /> <span>Подписаться</span>
                </>
            )}
        </ButtonProgress>
    );
};
