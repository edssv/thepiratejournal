import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './NavItem.module.scss';

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.root}>
      <Link className={clsx(styles.link, 'pb-4 text-sm', pathname === href && 'border-b')} href={href}>
        {label}
      </Link>
    </div>
  );
};

export default NavItem;
