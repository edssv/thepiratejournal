import { AlertDialog, Button, DialogTrigger } from '@adobe/react-spectrum';
import React from 'react';

interface ConfirmDialogProps {
    selectedFile: boolean;
    textareaValue: string | undefined;
    onClickSave: any;
    isEditing?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    selectedFile,
    textareaValue,
    onClickSave,
    isEditing,
}) => {
    return (
        <DialogTrigger>
            <Button isDisabled={selectedFile && textareaValue ? false : true} variant="cta">
                {isEditing ? 'Обновить статью' : 'Опубликовать'}
            </Button>
            {(close) => (
                <AlertDialog
                    variant="confirmation"
                    title={isEditing ? 'Обновление статьи' : 'Публикация статьи'}
                    primaryActionLabel={isEditing ? 'Обновить' : 'Опубликовать'}
                    // secondaryActionLabel="Сохранить как черновик"
                    cancelLabel="Отмена"
                    onPrimaryAction={onClickSave}>
                    {isEditing
                        ? 'Ты действительно хочешь обновить статью?'
                        : 'Ты действительно хочешь опубликовать новую статью?'}
                </AlertDialog>
            )}
        </DialogTrigger>
    );
};
