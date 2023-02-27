import { NavigationItem, NavigationItemIcon, NavigationItemLabel } from '../NavigationItem';
import { ThemeButton } from './components';

import styles from './NavRail.module.scss';

const navItemsData = [
    { icon: 'home', label: 'Дом', link: '' },
    { icon: 'subscriptions', label: 'Подписки', link: 'follow' },
    { icon: 'history', label: 'История', link: 'history' },
    { icon: 'bookmark', label: 'Закладки', link: 'bookmarks' },
];

export const NavRail = () => {
    return (
        <div className={styles.root}>
            <nav className={styles.content} aria-label="Main">
                {navItemsData.map((item, i) => (
                    <NavigationItem key={i} to={item.link}>
                        <NavigationItemIcon>{item.icon}</NavigationItemIcon>
                        <NavigationItemLabel>{item.label}</NavigationItemLabel>
                    </NavigationItem>
                ))}
            </nav>
            <ThemeButton />
        </div>
    );
};
