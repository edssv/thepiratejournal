import clsx from 'clsx';
import Link from 'next/link';

import { robotoMono } from '@/app/layout';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  href: string;
  title: string;
  cover: string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ cover, href, title }) => (
  <div className={styles.root}>
    <Link href={href}>
      <div className={styles.thumbContainer}>
        <div className={styles.thumbImg} style={{ backgroundImage: `url(${cover})` }} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.text}>
          <div className={clsx(styles.articleCategory, robotoMono.className)}>Обзоры</div>
          <div className={styles.headline}>{title}</div>
        </div>
      </div>
    </Link>
  </div>
);
