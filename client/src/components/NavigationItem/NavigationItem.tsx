import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import styles from './NavigationItem.module.scss';

export const NavigationItemIcon: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span className={clsx(styles.icon, 'material-symbols-outlined')}>{children}</span>;
};

export const NavigationItemLabel: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.label}>{children}</div>;
};

export const NavigationItem: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
  const { pathname } = useRouter();
  const currentLocation = `/${pathname.split('/')[1]}`;

  return (
    <Link className={clsx(styles.root, currentLocation === props.href && styles.active)} {...props}>
      {children}
    </Link>
  );
};
