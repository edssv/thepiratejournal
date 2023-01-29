import React, { PropsWithChildren } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../Buttons';

import styles from './DialogTrigger.module.scss';

interface DialogTriggerProps {
    title: string;
    description?: any;
    primaryActionLabel?: string;
    cancelLabel?: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onCancel?: () => void;
    onPrimaryAction?: () => void;
}

export const DialogTrigger: React.FC<PropsWithChildren<DialogTriggerProps>> = ({
    title,
    description,
    primaryActionLabel,
    onPrimaryAction,
    cancelLabel,
    onCancel,
    isOpen,
    setIsOpen,
    children,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.root}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}>
                        <Dialog.Overlay className={styles.dialogOverlay} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.05 }}
                        style={{ zIndex: 1 }}>
                        {' '}
                        <Dialog.Panel className={styles.dialogPanel}>
                            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                            <Dialog.Description className={styles.description}>
                                {description}
                            </Dialog.Description>
                            {children}
                            {(onCancel || onPrimaryAction) && (
                                <div className={styles.buttonGroup}>
                                    {cancelLabel && (
                                        <Button onClick={onCancel} variant="text">
                                            {cancelLabel}
                                        </Button>
                                    )}
                                    {primaryActionLabel && (
                                        <Button onClick={onPrimaryAction} variant="filled">
                                            {primaryActionLabel}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Dialog.Panel>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};
