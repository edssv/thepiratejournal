import React, { PropsWithChildren, useState } from 'react';

import { Button, DialogTrigger, Variant } from '..';
import { Dialog, DialogActionButton, DialogCancelButton, DialogContent, DialogControls, DialogTitle } from '../Dialog';
interface ButtonDeleteProps {
    onPrimaryAction?: any;
    icon?: boolean;
    variant?: Variant;
}

export const ButtonDelete: React.FC<PropsWithChildren<ButtonDeleteProps>> = ({
    onPrimaryAction,
    children,
    variant = 'text',
    icon = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={icon} variant={variant}>
                {children}
            </Button>
            <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
                <Dialog>
                    <DialogTitle>Удаление статьи</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить статью?</DialogContent>
                    <DialogControls>
                        <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
                        <DialogActionButton
                            onClick={() => {
                                onPrimaryAction();
                                setIsOpen(false);
                            }}
                        >
                            Удалить
                        </DialogActionButton>
                    </DialogControls>
                </Dialog>
            </DialogTrigger>
        </>
    );
};
