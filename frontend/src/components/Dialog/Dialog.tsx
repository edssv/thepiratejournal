import React, { PropsWithChildren } from 'react';

import { Button } from '../Buttons';

import styles from './Dialog.module.scss';

// type ActionButtonProps = Pick<ButtonProps, 'onClick' | 'progress'>;
// type CancelButtonProps  = Pick< extends ElementType, 'onClick'>;

export const DialogTitle: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.title}>{children}</div>;
};

export const DialogContent: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.content}>{children}</div>;
};

export const DialogControls: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.controls}>{children}</div>;
};

export const DialogActionButton: React.FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Button className={styles.actionButton} variant="filled" {...props}>
            {children}
        </Button>
    );
};

export const DialogCancelButton: React.FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Button className={styles.cancelButton} variant="filledTonal" {...props}>
            {children}
        </Button>
    );
};

export const Dialog: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.root}>{children}</div>;
};
