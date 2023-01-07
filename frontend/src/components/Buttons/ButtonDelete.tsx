import React, { useState } from 'react';
import { Button, Variant } from '..';
import { DialogTrigger } from '../Dialogs';
interface onPrimaryAction {
    onPrimaryAction?: any;
    children?: React.ReactNode;
    icon?: boolean;
    variant?: Variant;
}

export const ButtonDelete: React.FC<onPrimaryAction> = ({
    onPrimaryAction,
    children,
    variant,
    icon,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} icon={icon} variant={variant}>
                {children}
            </Button>
            <DialogTrigger
                title="Удаление статьи"
                description="Вы действительно хотите удалить статью?"
                primaryActionLabel="Удалить"
                onPrimaryAction={() => {
                    onPrimaryAction();
                    setIsOpen(false);
                }}
                cancelLabel="Отмена"
                onCancel={() => setIsOpen(false)}
                isOpen={isOpen}
                setIsOpen={setIsOpen}></DialogTrigger>
        </>
    );
};
