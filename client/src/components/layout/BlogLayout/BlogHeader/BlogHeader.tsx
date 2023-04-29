import dynamic from 'next/dynamic';

import styles from './BlogHeader.module.scss';
import Brand from './Brand/Brand';
import CommunityButton from './CommunityButton/CommunityButton';

const ThemeButton = dynamic(() => import('./ThemeButton/ThemeButton'), { ssr: false });

const BlogHeader = () => (
  <header className={styles.root}>
    <div className={styles.container}>
      <div className={styles.leftPart}>
        <Brand />
      </div>
      <div className={styles.rightPart}>
        <ThemeButton />
        <CommunityButton />
      </div>
    </div>
  </header>
);

export default BlogHeader;
