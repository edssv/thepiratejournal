import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { Overlay } from '../../../components';
import { HomeSection } from '../Home';

import styles from './TabPanel.module.scss';

interface TabPanelProps {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<HomeSection>>;
}

export const TabPanel: React.FC<PropsWithChildren<TabPanelProps>> = ({
    children,
    activeSection,
    setActiveSection,
}) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <Overlay />;

    return (
        <div className={styles.root}>
            <section className="articles">
                <div className={styles.tabMenu__wrapper}>
                    <ul className={styles.tabMenu}>
                        <li className={styles.tabMenu__tab}>
                            <Link
                                to="/for_you"
                                onClick={() => setActiveSection(HomeSection.ForYou)}
                                className={
                                    activeSection === HomeSection.ForYou ? styles.active : ''
                                }>
                                <div className={styles.tabIcon}>
                                    <span className="material-symbols-outlined">explore</span>{' '}
                                    <span className={styles.tabIconText}>Обзор</span>
                                </div>
                            </Link>
                        </li>

                        {user && (
                            <>
                                <li className={styles.tabMenu__tab}>
                                    <Link
                                        to="/following"
                                        onClick={() => setActiveSection(HomeSection.Following)}
                                        className={
                                            activeSection === HomeSection.Following
                                                ? styles.active
                                                : ''
                                        }>
                                        <div className={styles.tabIcon}>
                                            <span className="material-symbols-outlined">group</span>{' '}
                                            <span className={styles.tabIconText}>Подписки</span>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <ul className="AiryArticlesList">{children}</ul>
            </section>
        </div>
    );
};
