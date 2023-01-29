import React, { PropsWithChildren, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../../components';

import styles from './Sidebar.module.scss';

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
    useEffect(() => {
        if (isOpenSidebar) {
            document.body.style.overflow = 'hidden';
        } else document.body.style.overflow = '';
    }, [isOpenSidebar]);

    return (
        <>
            {isOpenSidebar && (
                <motion.div
                    style={{ translateY: 1 }}
                    animate={{ translateY: 0 }}
                    exit={{ y: 50, opacity: 0 }}>
                    <div className={`${styles.overlay} overlay`}>
                        <div className={styles.container}>
                            <div className={styles.root}>
                                <div className={styles.content}>
                                    <div className={styles.scrollingContainer}>
                                        <div className={styles.top}>
                                            <div className={styles.title}>{title}</div>
                                            <Button
                                                onClick={() => setOpenSidebar(false)}
                                                icon
                                                color="var(--md-sys-color-on-surface)">
                                                <span className="material-symbols-outlined">
                                                    close
                                                </span>
                                            </Button>
                                        </div>
                                        <div className={styles.contents}>{children}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};
