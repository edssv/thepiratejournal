import React, { PropsWithChildren } from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { Button, ButtonProps } from '../Buttons';

import styles from './Dialog.module.scss';

type DialogProps = {
    size?: 'S' | 'M' | 'L';
    mobileType?: 'modal' | 'fullscreen';
};

type DialogControlsProps = { className?: string };

type ActionButtonProps = ButtonProps<React.ElementType>;
type CancelButtonProps = ButtonProps<React.ElementType>;

export const DialogTitle: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.title}>{children}</div>;
};

export const DialogContent: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.content}>{children}</div>;
};

export const DialogControls: React.FC<PropsWithChildren<DialogControlsProps>> = ({ children, className }) => {
    return <div className={`${styles.controls} ${className}`}>{children}</div>;
};

export const DialogActionButton: React.FC<PropsWithChildren<ActionButtonProps>> = ({ children, ...props }) => {
    return (
        <Button className={styles.actionButton} {...props}>
            {children}
        </Button>
    );
};

export const DialogCancelButton: React.FC<PropsWithChildren<CancelButtonProps>> = ({ children, ...props }) => {
    return (
        <Button className={styles.cancelButton} {...props}>
            {children}
        </Button>
    );
};

export const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({ children, size = 'S', mobileType = 'modal' }) => {
    const isMobile = useMediaPredicate('(max-width: 509.98px)');

    const setSize = () => {
        if (size === 'S') return 'smallDialog';
        if (size === 'M') return 'mediumDialog';
        if (size === 'L') return 'largeDialog';
    };

    const setMobileType = () => {
        if (isMobile) {
            if (mobileType === 'modal') return 'mobileModal';
            if (mobileType === 'fullscreen') return 'mobileFullscreen';
        } else return '';
    };

    return <div className={`${styles.root} ${setSize()} ${setMobileType()}`}>{children}</div>;
};