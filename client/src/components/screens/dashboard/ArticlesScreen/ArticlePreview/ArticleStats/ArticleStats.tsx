import React from 'react';

import styles from './ArticleStats.module.scss';

interface ArticleStatsProps {
  // likesCount: number;
  viewsCount: number;
}

const ArticleStats: React.FC<ArticleStatsProps> = ({ viewsCount }) => (
  <div className={styles.root}>
    {/* <div className={styles.iconAndCount}>
      <span className='material-symbols-outlined'>favorite</span>
      <span>{likesCount}</span>
    </div> */}
    <div className={styles.iconAndCount}>
      <span className='material-symbols-outlined'>visibility</span>
      <span>{viewsCount}</span>
    </div>
  </div>
);

export default ArticleStats;
