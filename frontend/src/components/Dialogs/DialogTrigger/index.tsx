import { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../Buttons';

import styles from './DialogTrigger.module.scss';

interface DialogTriggerProps {
    title: string;
    description?: string;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    cancelLabel?: string;
    onCancel?: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: ReactNode;
}

export const DialogTrigger = ({
    title,
    description,
    primaryActionLabel,
    onPrimaryAction,
    cancelLabel,
    onCancel,
    isOpen,
    setIsOpen,
    children,
}: DialogTriggerProps) => {
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
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: -500 }}
                        transition={{ duration: 0.2 }}
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
