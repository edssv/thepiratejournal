import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavigationItem.module.scss';

export const NavigationItemIcon: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <span className={`${styles.icon} material-symbols-outlined`}>{children}</span>;
};

export const NavigationItemLabel: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className={styles.label}>{children}</div>;
};

export const NavigationItem: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
    const pathname = usePathname();
    const currentLocation = pathname.split('/')[1];
    return (
        <Link className={`${styles.root} ${currentLocation === props.href ? styles.active : ''}`} {...props}>
            {children}
        </Link>
    );
};
