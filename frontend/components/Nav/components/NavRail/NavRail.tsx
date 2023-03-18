import { useRouter } from 'next/navigation';

import { navData } from '@/lib/navData';
import { FAB } from '@/components/Buttons/FAB';
import { NavigationItem, NavigationItemIcon, NavigationItemLabel } from '../NavigationItem';
import { ThemeButton } from './components';

import styles from './NavRail.module.scss';

export const NavRail = () => {
    const { push } = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <FAB onClick={() => push('/articles/new')} className={styles.fab}>
                    <span className="material-symbols-outlined">edit</span>
                </FAB>
                <nav className={styles.nav} aria-label="Main">
                    {navData.map((item, i) => (
                        <NavigationItem key={i} href={item.link}>
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
