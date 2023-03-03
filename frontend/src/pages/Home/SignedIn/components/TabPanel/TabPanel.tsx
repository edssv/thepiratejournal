import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../../hooks';
import { Overlay } from '../../../../../components';
import { HomeSection } from '../../SignedIn';

import styles from './TabPanel.module.scss';

interface TabPanelProps {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<HomeSection>>;
}

export const TabPanel: React.FC<TabPanelProps> = ({ activeSection, setActiveSection }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    return (
        <div className={styles.root}>
            <section className="articles">
                <div className={styles.navRailContainer}>
                    <nav className={styles.navRail}>
                        <Link
                            to="/for_you"
                            onClick={() => setActiveSection(HomeSection.ForYou)}
                            className={`${styles.sectionLink} ${
                                activeSection === HomeSection.ForYou ? styles.active : ''
                            }`}
                        >
                            <span className={`${styles.icon} material-symbols-outlined`}>explore</span>
                            <div className={styles.label}>Обзор</div>
                        </Link>

                        {user && (
                            <>
                                <Link
                                    to="/following"
                                    onClick={() => setActiveSection(HomeSection.Following)}
                                    className={`${styles.sectionLink} ${
                                        activeSection === HomeSection.Following ? styles.active : ''
                                    }`}
                                >
                                    <span className={`${styles.icon} material-symbols-outlined`}>group</span>
                                    <div className={styles.label}>Подписки</div>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </section>
        </div>
    );
};
