import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './ActionDialog.module.scss';

interface ActionDialogProps {
    isOpen: boolean;
}

export const ActionDialog: React.FC<PropsWithChildren<ActionDialogProps>> = ({ children, isOpen }) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className={styles.root}>
                    <motion.div
                        style={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                    >
                        <div className={styles.dialogPanel}>
                            <p className={styles.actionText}>{children}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        portalRoot
    );
};
