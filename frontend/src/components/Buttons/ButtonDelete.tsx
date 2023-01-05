import React from 'react';
import { AlertDialog, DialogTrigger } from '@adobe/react-spectrum';
import { Button, Variant } from '..';
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
    return (
        <DialogTrigger>
            <Button icon={icon} variant={variant}>
                {children}
            </Button>
            {(close) => (
                <AlertDialog
                    variant="destructive"
                    title="Удаление статьи"
                    primaryActionLabel="Удалить"
                    onPrimaryAction={() => {
                        onPrimaryAction();
                        close();
                    }}
                    cancelLabel="Отмена"
                    onCancel={close}>
                    Вы действительно хотите удалить статью?
                </AlertDialog>
            )}
        </DialogTrigger>
    );
};
