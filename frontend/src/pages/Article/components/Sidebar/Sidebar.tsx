import React, { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useMediaPredicate } from 'react-media-hook';

import { Button } from '../../../../components';

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
    const portalRoot = document.getElementById('portal-root') || new HTMLElement();
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    useEffect(() => {
        if (isTablet && isOpenSidebar) {
            document.body.style.overflow = 'hidden';
        } else document.body.style.overflow = '';
    }, [isOpenSidebar]);

    return (
        <>
            {ReactDOM.createPortal(
                <>
                    <div className={`${styles.root} ${isOpenSidebar ? 'open-sidebar' : ''}`}>
                        <div className={styles.content}>
                            <div className={styles.scrollingContainer}>
                                <div className={styles.top}>
                                    <div className={styles.left}>
                                        {!isTablet && (
                                            <Button onClick={() => setOpenSidebar(false)} icon>
                                                <span className="material-symbols-outlined">arrow_back</span>
                                            </Button>
                                        )}
                                        <div className={styles.title}>{title}</div>
                                    </div>
                                    <Button onClick={() => setOpenSidebar(false)} className={styles.buttonClose} icon>
                                        <span className="material-symbols-outlined">close</span>
                                    </Button>
                                </div>
                                <div className={styles.contents}>{children}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => setOpenSidebar(false)}
                        className={`${styles.overlay} ${isOpenSidebar ? styles.visible : styles.hidden} overlay`}
                    />
                </>,
                portalRoot
            )}
        </>
    );
};
