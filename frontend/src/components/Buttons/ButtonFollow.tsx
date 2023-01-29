import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { useFollowMutation, useUnFollowMutation } from '../../redux';
import { DialogTrigger, ActionDialog } from '../Dialogs';
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

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenTippy, setIsOpenTippy] = useState<boolean>(false);

    const [follow, { isLoading: isLoadingFollow }] = useFollowMutation();
    const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation();

    const [isFollow, setIsFollow] = useState<boolean>();

    useEffect(() => {
        setIsFollow(hasSubscription);
    }, [hasSubscription]);

    const handleFollow = () => {
        setIsOpenTippy(true);
        setTimeout(() => setIsOpenTippy(false), 3000);

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
                        onClick={() => setIsOpen(true)}
                        isActive={isOpen}
                        icon={configuration === 'icon'}
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
                    <DialogTrigger
                        title="Отписаться от автора"
                        description="Ты точно хочешь отписаться от автора?"
                        primaryActionLabel="Отписаться"
                        onPrimaryAction={() => {
                            handleFollow();
                            setIsOpen(false);
                        }}
                        cancelLabel="Отмена"
                        onCancel={() => setIsOpen(false)}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}></DialogTrigger>
                    <ActionDialog isOpen={isOpenTippy} actionText="Ты подписался на автора" />
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
                    <ActionDialog isOpen={isOpenTippy} actionText="Ты отписался от автора" />
                </>
            )}
        </>
    );
};
