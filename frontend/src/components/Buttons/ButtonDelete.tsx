import React, { CSSProperties } from 'react';
import { AlertDialog, Button, DialogTrigger } from '@adobe/react-spectrum';
interface onPrimaryAction {
    onPrimaryAction?: any;
    children?: React.ReactNode;
    variant?: 'accent' | 'primary' | 'secondary' | 'negative';
    staticColor?: 'white' | 'black';
    style?: 'fill' | 'outline';
    UNSAFE_style?: CSSProperties;
}

export const ButtonDelete: React.FC<onPrimaryAction> = ({
    onPrimaryAction,
    children,
    variant,
    staticColor,
    style,
    UNSAFE_style,
}) => {
    return (
        <DialogTrigger>
            <Button
                type="button"
                variant={variant ? variant : 'accent'}
                staticColor={staticColor}
                style={style}
                UNSAFE_style={UNSAFE_style}>
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
