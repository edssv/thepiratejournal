import React, { PropsWithChildren, useState } from 'react';

import { Button, Variant } from '..';
import { DialogTrigger } from '../Dialogs';
interface ButtonDeleteProps {
    onPrimaryAction?: any;
    icon?: boolean;
    variant?: Variant;
}

export const ButtonDelete: React.FC<PropsWithChildren<ButtonDeleteProps>> = ({
    onPrimaryAction,
    children,
    variant = 'text',
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
                setIsOpen={setIsOpen}
            />
        </>
    );
};
