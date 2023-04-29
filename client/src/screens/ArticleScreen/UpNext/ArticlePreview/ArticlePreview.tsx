import clsx from 'clsx';
import Link from 'next/link';

import { robotoMono } from '@/components/fonts/roboto-mono';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  href: string;
  title: string;
  cover: string;
  category: string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ href, title, cover, category }) => (
  <div className={styles.root}>
    <Link href={href}>
      <div className={styles.thumbContainer}>
        <div className={styles.thumbImg} style={{ backgroundImage: `url(${cover})` }} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.text}>
          <div className={clsx(styles.articleCategory, robotoMono.className, robotoMono.style)}>
            {category}
          </div>
          <div
            className={styles.headline}
            dangerouslySetInnerHTML={{
              __html: title || 'Без названия'
            }}
          />
        </div>
      </div>
    </Link>
  </div>
);
