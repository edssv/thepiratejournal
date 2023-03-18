'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/Buttons/Button';

import styles from './Snackbar.module.scss';

type SnackbarProps = {
    className?: string;
    position?: 'left' | 'center';
    permanent?: boolean;
    timeout?: number;
    isOpen: boolean;
    close?: boolean;
    accept?: boolean;
    onClose: () => void;
};

export const Snackbar: React.FC<React.PropsWithChildren<SnackbarProps>> = ({
    children,
    className,
    position = 'left',
    permanent = false,
    timeout = 4000,
    isOpen,
    close = false,
    accept = false,
    onClose,
}) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();

    useEffect(() => {
        if (!permanent) {
            setTimeout(() => onClose(), timeout);
        }
    }, [isOpen]);

    const setPosition = () => {
        if (position === 'left') return styles.left;
        if (position === 'center') return styles.center;
    };

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`${styles.root} ${setPosition()} ${className ?? ''}`}
                    style={{ bottom: -5, opacity: 0 }}
                    animate={{ bottom: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <p className={styles.supportingText}>{children}</p>
                    {close && (
                        <Button onClick={onClose} className={styles.close} icon>
                            <span className="material-symbols-outlined">close</span>
                        </Button>
                    )}
                    {accept && <Button onClick={onClose}>Хорошо</Button>}
                </motion.div>
            )}
        </AnimatePresence>,
        portalRoot,
    );
};
