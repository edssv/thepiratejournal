import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import logo from '@/assets/img/logotype.png';
import styles from './BlogHeader.module.scss';

const BlogHeader = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
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
          </Link>
          <Link href={getPublicUrl.blogPage()} className="icon-center">
            <span>The Pirate Journal</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
