import clsx from 'clsx';
import Link from 'next/link';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './LogoBlock.module.scss';

const LogoBlock = () => (
  <Link className={clsx(styles.root, 'icon-center')} href={getPublicUrl.community()}>
    <>
      <svg fill='none' height='40' viewBox='0 0 50 201' width='50' xmlns='http://www.w3.org/2000/svg'>
        <rect
          fill='var(--md-sys-color-on-surface)'
          height='129.8'
          rx='36.0997'
          transform='rotate(30 0 0)'
          width='72.1994'
          x='0'
          y='32'
        />
        <rect
          fill='var(--md-sys-color-on-surface)'
          height='72.1995'
          rx='36.0997'
          transform='rotate(45 75 24.25)'
          width='72.1994'
          x='64'
          y='32'
        />
      </svg>
      <span>The Pirate Journal</span>
    </>
  </Link>
);

export default LogoBlock;
