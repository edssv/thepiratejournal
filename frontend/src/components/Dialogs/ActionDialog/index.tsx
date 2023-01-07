import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './ActionDialog.module.scss';

interface ActionDialogProps {
    children?: any;
    actionText: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActionDialog: React.FC<ActionDialogProps> = ({
    children,
    actionText,
    isOpen,
    setIsOpen,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.root}>
                    <motion.div
                        style={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}>
                        <Dialog.Panel className={styles.dialogPanel}>
                            <Dialog.Description className={styles.actionText}>
                                {actionText}
                            </Dialog.Description>
                        </Dialog.Panel>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};
