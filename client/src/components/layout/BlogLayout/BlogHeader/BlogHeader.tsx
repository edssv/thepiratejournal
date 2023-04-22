import dynamic from 'next/dynamic';

import Brand from './Brand/Brand';
import CommunityButton from './CommunityButton/CommunityButton';

import styles from './BlogHeader.module.scss';

const ThemeButton = dynamic(() => import('./ThemeButton/ThemeButton'), { ssr: false });

const BlogHeader = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.leftPart}>
          <Brand />
        </div>
        <div className={styles.rightPart}>
          <CommunityButton />
          <ThemeButton />
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
