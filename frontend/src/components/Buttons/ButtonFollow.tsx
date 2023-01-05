import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { useFollowMutation, useUnFollowMutation } from '../../redux';
import { ActionDialog } from '../ActionDialog';
import { Tippy } from '../Tippy';
import { Button } from './Button';

interface ButtonFollowProps {
    username: string | undefined;
    hasSubscription: boolean | undefined;
    configuration?: 'icon' | 'text' | 'iconWithText';
}

export const ButtonFollow: React.FC<ButtonFollowProps> = ({
    username,
    hasSubscription,
    configuration,
}) => {
    const { user, isLoading } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
    const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation();

    const [isFollow, setIsFollow] = useState<boolean>();

    useEffect(() => {
        setIsFollow(hasSubscription);
    }, [hasSubscription]);

    const handleFollow = () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);

        if (isFollow) {
            setIsFollow(false);
            unFollow(username);
        } else {
            setIsFollow(true);
            follow(username);
        }
    };

    if (!user) {
        return (
            <>
                <Tippy
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    offset={50}
                    tooltipPosition="right"
                    title="Следи за обновлениями авторов"
                    description="Чтобы отслеживать обновления авторов, войди в аккаунт.">
                    <Button
                        icon={configuration === 'icon'}
                        onClick={() => setIsOpen(true)}
                        variant="filled">
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">add_circle</span>
                                Подписаться
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person_add</span>
                        ) : (
                            'Подписаться'
                        )}
                    </Button>
                </Tippy>
            </>
        );
    }

    return (
        <>
            {isFollow ? (
                <>
                    <Button
                        icon={configuration === 'icon'}
                        onClick={handleFollow}
                        variant="filledTonal">
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">notifications</span>
                                Подписка
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person</span>
                        ) : (
                            'Подписка'
                        )}
                    </Button>
                    <ActionDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        actionText="Ты подписался на автора."
                    />
                </>
            ) : (
                <>
                    <Button icon={configuration === 'icon'} onClick={handleFollow} variant="filled">
                        {configuration === 'iconWithText' ? (
                            <>
                                <span className="material-symbols-outlined">add_circle</span>
                                Подписаться
                            </>
                        ) : configuration === 'icon' ? (
                            <span className="material-symbols-outlined">person_add</span>
                        ) : (
                            'Подписаться'
                        )}
                    </Button>
                    <ActionDialog
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        actionText="Ты отписался от автора."
                    />
                </>
            )}
        </>
    );
};
