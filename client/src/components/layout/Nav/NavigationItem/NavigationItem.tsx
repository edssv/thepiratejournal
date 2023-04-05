import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavigationItem.module.scss';

const NavigationItemIcon: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <span className={`${styles.icon} material-symbols-outlined`}>{children}</span>;
};

const NavigationItemLabel: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className={styles.label}>{children}</div>;
};

const NavigationItem: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
    const { pathname } = useRouter();
    const currentLocation = pathname.split('/')[1];

    return (
        <Link
            className={`${styles.root} ${
                currentLocation === props.href || currentLocation === '/' ? styles.active : ''
            }`}
            {...props}
        >
            {children}
        </Link>
    );
};
