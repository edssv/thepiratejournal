import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TabPanel.module.scss';
import { Divider } from '@adobe/react-spectrum';
import Compass from '@spectrum-icons/workflow/Compass';
import UserGroup from '@spectrum-icons/workflow/UserGroup';
import { useAuth } from '../../../hooks';
import { Overlay } from '../../../components';

interface TabPanelProps {
    children?: React.ReactNode;
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

export const TabPanel: React.FC<TabPanelProps> = ({
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
                                onClick={() => setActiveSection('for_you')}
                                className={activeSection === 'for_you' ? styles.active : ''}>
                                <div className={styles.tabIcon}>
                                    <span className="material-symbols-outlined">explore</span>{' '}
                                    <span>Обзор</span>
                                </div>
                            </Link>
                        </li>

                        {user && (
                            <>
                                <li className={styles.tabMenu__tab}>
                                    <Link
                                        to="/following"
                                        onClick={() => setActiveSection('following')}
                                        className={
                                            activeSection === 'following' ? styles.active : ''
                                        }>
                                        <div className={styles.tabIcon}>
                                            <span className="material-symbols-outlined">group</span>{' '}
                                            <span>Подписки</span>
                                        </div>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <ul className="articles__list">{children}</ul>
            </section>
        </div>
    );
};
