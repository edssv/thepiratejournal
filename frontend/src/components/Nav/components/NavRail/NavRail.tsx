import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { navData } from '@/lib/navData';
import FAB from '@/components/Buttons/FAB/FAB';
import { NavigationItem, NavigationItemIcon, NavigationItemLabel } from '@/components/NavigationItem/NavigationItem';
import ClientOnly from '@/components/ClientOnly/ClientOnly';

import styles from './NavRail.module.scss';

const ThemeButton = dynamic(() => import('./components/ThemeButton/ThemeButton'), { ssr: false });

const NavRail = () => {
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
            <div>
                <ClientOnly>
                    <ThemeButton />
                </ClientOnly>
            </div>
        </div>
    );
};

export default NavRail;
