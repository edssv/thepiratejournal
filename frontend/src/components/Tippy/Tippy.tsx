import React, { Fragment, PropsWithChildren, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { Dialog, Popover, Transition } from '@headlessui/react';

import { Button } from '../Buttons';

import styles from './Tippy.module.scss';

interface TippyProps {
    tooltipPosition: any;
    description: string;
    title: string;
    offset?: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Tippy: React.FC<PropsWithChildren<TippyProps>> = ({ children, description, title, isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    if (fromLaptop) {
        return (
            <Popover>
                {children}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.root}>
                    <Dialog.Panel className={styles.dialogPanel}>
                        <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
                        <Dialog.Description className={styles.dialogDescription}>{description}</Dialog.Description>
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
                                variant="filledTonal"
                            >
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
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className={styles.dialogOverlay} />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className={styles.dialogPanel}>
                            <Dialog.Title className={styles.dialogTitle}>{title}</Dialog.Title>
                            <Dialog.Description className={styles.dialogDescription}>{description}</Dialog.Description>
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
                                    variant="filledTonal"
                                >
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
