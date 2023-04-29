import clsx from 'clsx';
import Link from 'next/link';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './ArticlePreview.module.scss';
import ArticleStats from './ArticleStats/ArticleStats';

interface ArticlePreviewProps {
  article: any;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => (
  <div className={styles.root}>
    <div className={styles.top}>
      <Link href={getPublicUrl.article(article.id)}>
        <div className={styles.image} style={{ backgroundImage: `url(${article.cover})` }} />
      </Link>
    </div>
    <div className={styles.bottom}>
      <div className={styles.info}>
        <Link
          className={styles.headline}
          dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
          href={getPublicUrl.article(article.id)}
        />
        <Link className={clsx(styles.author, 'tp-text')} href={getPublicUrl.profile(article.user.id)}>
          {article.user.username}
        </Link>
      </div>
      <ArticleStats likesCount={article.likesCount} viewsCount={article.viewsCount} />
    </div>
  </div>
);

export default ArticlePreview;
