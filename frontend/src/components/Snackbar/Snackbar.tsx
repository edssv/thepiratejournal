import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Snackbar.module.scss';
import { Button } from '../Buttons';

type SnackbarProps = {
    position?: 'left' | 'center' | 'right';
    isOpen: boolean;
    close?: boolean;
    onClose: () => void;
};

export const Snackbar: React.FC<PropsWithChildren<SnackbarProps>> = ({
    children,
    position = 'left',
    close = false,
    isOpen,
    onClose,
}) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();

    useEffect(() => {
        setTimeout(() => onClose(), 4000);
    }, [isOpen]);

    const setPosition = () => {
        if (position === 'left') return styles.left;
        if (position === 'center') return styles.center;
        if (position === 'right') return styles.right;
    };

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={`${styles.root} ${setPosition()}`}
                    style={{ bottom: -50, opacity: 0 }}
                    animate={{ bottom: 16, opacity: 1 }}
                    exit={{ bottom: -50, opacity: 0 }}
                >
                    <p className={styles.supportingText}>{children}</p>
                    {close && (
                        <Button onClick={onClose} className={styles.close} icon>
                            <span className="material-symbols-outlined">close</span>
                        </Button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>,
        portalRoot
    );
};
