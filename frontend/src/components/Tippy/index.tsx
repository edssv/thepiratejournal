import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Tippy.module.scss';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Button } from '../Buttons';
import { usePopper } from 'react-popper';
import { useMediaPredicate } from 'react-media-hook';

interface TippyProps {
    children?: any;
    tooltipPosition: any;
    description: string;
    title: string;
    offset?: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Tippy: React.FC<TippyProps> = ({
    children,
    tooltipPosition,
    description,
    title,
    offset,
    isOpen,
    setIsOpen,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    let [referenceElement, setReferenceElement] = useState(null);
    let [popperElement, setPopperElement] = useState(null);
    let { styles: poperStyles, attributes } = usePopper(referenceElement, popperElement);

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    if (fromLaptop) {
        return (
            <Popover>
                {children}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.root}>
                    <Dialog.Panel className={styles.dialogPanel}>
                        <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
                        <Dialog.Description className={styles.dialogDescription}>
                            {description}
                        </Dialog.Description>
                        <div className={styles.dialogButtonGroup}>
                            <Button onClick={() => setIsOpen(false)} variant="filled">
                                Не сейчас
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/login', {
                                        state: { from: location },
                                    });
                                }}
                                variant="filledTonal">
                                Войти
                            </Button>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Popover>
        );
    }

    return (
        <>
            {children}
            <Transition show={isOpen} as={Fragment}>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.root}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className={styles.dialogOverlay} />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className={styles.dialogPanel}>
                            <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
                            <Dialog.Description className={styles.dialogDescription}>
                                {description}
                            </Dialog.Description>
                            <div className={styles.dialogButtonGroup}>
                                <Button onClick={() => setIsOpen(false)} variant="filled">
                                    Не сейчас
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsOpen(false);
                                        navigate('/login', {
                                            state: { from: location },
                                        });
                                    }}
                                    variant="filledTonal">
                                    Войти
                                </Button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
};
