import React, { Fragment, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

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
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();

    const fromLaptop = useMediaPredicate('(min-width: 991px)');

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className={styles.root}>
                    {' '}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                    >
                        <div onClick={() => setIsOpen(false)} className={styles.overlay} />
                    </motion.div>
                    <motion.div
                        className={styles.dialog}
                        initial={{ y: 2, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 2, opacity: 0 }}
                        transition={{ duration: 0.05, ease: 'linear' }}
                    >
                        <div className={styles.dialogPanel}>
                            <div className={styles.dialogTitle}>{title}</div>
                            <div className={styles.dialogDescription}>{description}</div>
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
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        portalRoot
    );
};
