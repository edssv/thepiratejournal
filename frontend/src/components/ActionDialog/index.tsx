import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

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
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}>
            <Dialog static={true} onClose={() => setIsOpen(false)} className={styles.root}>
                <Dialog.Panel className={styles.dialogPanel}>
                    <Dialog.Description className={styles.actionText}>
                        {actionText}
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
};
