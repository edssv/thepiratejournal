'use client';

import { RefAttributes, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { usePopper } from 'react-popper';
import { useMediaPredicate } from 'react-media-hook';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { useOnClickOutside } from '@/hooks';
import { Button } from '@/components/Buttons/Button';

import styles from './Tippy.module.scss';

interface TippyProps {
    tooltipPosition?: any;
    description?: string;
    title: string;
    offset?: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    placement?: 'top' | 'right' | 'bottom' | 'left';
}

type ComponentRootProps = React.HTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> &
    Omit<TippyProps, 'isOpen'>;
interface ComponentProps extends ComponentRootProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Component: React.FC<ComponentProps> = ({ setIsOpen, title, description, ...otherProps }) => {
    const { push } = useRouter();

    return (
        <div className={styles.root} {...otherProps}>
            {' '}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'linear' }}>
                <div className={styles.overlay} />
            </motion.div>
            <motion.div
                className={styles.dialog}
                initial={{ y: 2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 2, opacity: 0 }}
                transition={{ duration: 0.05, ease: 'linear' }}>
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
                                push('/login');
                            }}
                            variant="filledTonal">
                            Войти
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Tippy: React.FC<React.PropsWithChildren<TippyProps>> = ({
    children,
    description,
    title,
    isOpen,
    setIsOpen,
    placement = 'right',
}) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();
    const tippyRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const { styles: popperStyles, attributes } = usePopper(buttonRef.current, tippyRef.current, {
        placement: placement,

        modifiers: [{ name: 'offset', options: { offset: [0, 24] } }],
    });

    useEffect(() => {
        if (tippyRef?.current && isTablet) {
            disableBodyScroll(tippyRef?.current);

            if (!isOpen) enableBodyScroll(tippyRef?.current);
        }
    }, [isOpen, isTablet]);

    useOnClickOutside(tippyRef, () => setIsOpen(false));

    if (!isTablet) {
        return (
            <>
                <div ref={buttonRef}>{children}</div>
                {ReactDOM.createPortal(
                    <div ref={tippyRef} style={popperStyles.popper} {...attributes}>
                        <AnimatePresence>
                            {isOpen && (
                                <Component
                                    setIsOpen={setIsOpen}
                                    title={title}
                                    description={description}
                                />
                            )}
                        </AnimatePresence>{' '}
                    </div>,
                    portalRoot,
                )}
            </>
        );
    }

    return (
        <>
            <div ref={buttonRef}>{children}</div>
            {ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <Component setIsOpen={setIsOpen} title={title} description={description} />
                    )}
                </AnimatePresence>,
                portalRoot,
            )}
        </>
    );
};
