import React, { PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './DialogTrigger.module.scss';

interface DialogTriggerProps {
    isVisible?: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogTrigger: React.FC<PropsWithChildren<DialogTriggerProps>> = ({ children, isVisible, onClose }) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rootRef?.current) {
            disableBodyScroll(rootRef?.current);

            if (!isVisible) enableBodyScroll(rootRef?.current);
        }
    }, [isVisible]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isVisible && (
                <div ref={rootRef} className={styles.root}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                    >
                        <div onClick={() => onClose(false)} className={styles.overlay} />
                    </motion.div>
                    {children}
                </div>
            )}
        </AnimatePresence>,
        portalRoot
    );
};
