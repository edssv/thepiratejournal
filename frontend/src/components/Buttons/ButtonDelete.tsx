import { AlertDialog, Button, DialogTrigger } from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import React from 'react';

interface onPrimaryAction {
    onPrimaryAction?: any;
}

export const ButtonDelete: React.FC<onPrimaryAction> = ({ onPrimaryAction }) => {
    return (
        <DialogTrigger>
            <Button type="button" variant="secondary">
                <Delete />
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
