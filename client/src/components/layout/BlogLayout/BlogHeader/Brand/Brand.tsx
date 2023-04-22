import Link from 'next/link';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './Brand.module.scss';

const Brand: React.FC = () => {
  return (
    <div className={styles.brand}>
      <Link href={getPublicUrl.home()} className="icon-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 201" fill="none">
          <rect
            x="0"
            y="32"
            width="72.1994"
            height="129.8"
            rx="36.0997"
            transform="rotate(30 0 0)"
            fill="var(--md-sys-color-on-surface)"
          />
          <rect
            x="64"
            y="32"
            width="72.1994"
            height="72.1995"
            rx="36.0997"
            transform="rotate(45 75 24.25)"
            fill="var(--md-sys-color-on-surface)"
          />
        </svg>
        <span>The Pirate Journal</span>
      </Link>
    </div>
  );
};

export default Brand;
