import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../../components';

import styles from './Sidebar.module.scss';
import { useMediaPredicate } from 'react-media-hook';

interface SidebarProps {
    isOpenSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

export const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({
    isOpenSidebar,
    setOpenSidebar,
    title,
    children,
}) => {
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    useEffect(() => {
        if (isOpenSidebar) {
            document.body.style.overflow = 'hidden';
        } else document.body.style.overflow = '';
    }, [isOpenSidebar]);

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpenSidebar && (
                <div className={styles.container}>
                    <div className={`${styles.overlay} overlay`} />
                    <div className={styles.root}>
                        {' '}
                        <motion.div
                            style={isTablet ? { y: 150 } : { x: 0 }}
                            animate={isTablet ? { y: 0 } : { x: 0 }}
                            exit={{ opacity: 0 }}>
                            {' '}
                            <div className={styles.content}>
                                <div className={styles.scrollingContainer}>
                                    <div className={styles.top}>
                                        <div className={styles.title}>{title}</div>
                                        <Button
                                            onClick={() => setOpenSidebar(false)}
                                            className={styles.buttonClose}
                                            icon
                                            color="var(--md-sys-color-on-surface)">
                                            <span className="material-symbols-outlined">close</span>
                                        </Button>
                                    </div>
                                    <div className={styles.contents}>{children}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        portalRoot,
    );
};
