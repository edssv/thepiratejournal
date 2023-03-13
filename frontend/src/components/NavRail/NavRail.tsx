import { useLocation, useNavigate } from 'react-router-dom';

import { navData } from '../../lib/navData';
import { FAB } from '../Buttons';
import { NavigationItem, NavigationItemIcon, NavigationItemLabel } from '../NavigationItem';
import { ThemeButton } from './components';

import styles from './NavRail.module.scss';

export const NavRail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <FAB onClick={() => navigate('/articles/new', { state: { from: location } })} className={styles.fab}>
                    <span className="material-symbols-outlined">edit</span>
                </FAB>
                <nav className={styles.nav} aria-label="Main">
                    {navData.map((item, i) => (
                        <NavigationItem key={i} to={item.link}>
                            <NavigationItemIcon>{item.icon}</NavigationItemIcon>
                            <NavigationItemLabel>{item.label}</NavigationItemLabel>
                        </NavigationItem>
                    ))}
                </nav>
            </div>
            <ThemeButton />
        </div>
    );
};
