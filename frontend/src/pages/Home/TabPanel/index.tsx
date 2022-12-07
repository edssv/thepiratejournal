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
                                <span className="icon-center">
                                    <Compass size="S" marginEnd="2px" /> Обзор
                                </span>
                            </Link>
                        </li>

                        {user && (
                            <>
                                <Divider
                                    size="S"
                                    orientation="vertical"
                                    margin="0px 16px"
                                    height="25px"
                                />
                                <li className={styles.tabMenu__tab}>
                                    <Link
                                        to="/following"
                                        onClick={() => setActiveSection('following')}
                                        className={
                                            activeSection === 'following' ? styles.active : ''
                                        }>
                                        <span className="icon-center">
                                            <UserGroup size="S" marginEnd="2px" /> Подписки
                                        </span>
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
