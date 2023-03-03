import React, { PropsWithChildren, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../Buttons';

import styles from './Tippy.module.scss';
import { useOnClickOutside } from '../../hooks';
import { usePopper } from 'react-popper';

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
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const tippyRef = useRef<HTMLDivElement>(null);
    const { styles: popperStyles, attributes } = usePopper(buttonRef.current, tippyRef.current, {
        placement: 'bottom',
        strategy: 'absolute',
        modifiers: [{ name: 'offset', options: { offset: [24, 24] } }],
    });

    useOnClickOutside(rootRef, () => setIsOpen(false));

    return (
        <>
            <div ref={buttonRef}>{children}</div>
            <AnimatePresence>
                {isOpen && (
                    <div ref={tippyRef} className={styles.root} style={popperStyles.popper} {...attributes}>
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
            </AnimatePresence>
        </>
    );
};
