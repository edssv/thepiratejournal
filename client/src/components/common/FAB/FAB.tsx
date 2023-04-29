import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from './FAB.module.scss';

export type FABProps = {
  size?: 'S' | 'M' | 'L';
};

const FAB: React.FC<PropsWithChildren<FABProps & React.HTMLAttributes<HTMLButtonElement>>> = ({
  children,
  className,
  size = 'M',
  ...props
}) => {
  const getSize = () => {
    if (size === 'S') return 'small';
    if (size === 'L') return 'large';
    return 'medium';
  };

  return (
    <button className={clsx(styles.root, className && className, styles[getSize()])} {...props}>
      {children}
    </button>
  );
};

export default FAB;
