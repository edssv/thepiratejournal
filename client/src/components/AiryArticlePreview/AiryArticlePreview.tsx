import Image from 'next/image';
import Link from 'next/link';

import type { ArticlePreview } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './AiryArticlePreview.module.scss';

interface ArticlePreviewProps {
  article: ArticlePreview;
  size?: 'S' | 'M';
}

const AiryArticlePreview: React.FC<ArticlePreviewProps> = ({ article, size = 'S' }) => (
  <div className={`${styles.root} ${size === 'S' ? styles.sizeSmall : styles.sizeMedium}`}>
    <Link className={styles.thumbnail} href={getPublicUrl.article(article.id)}>
      {' '}
      <div className={styles.thumbContainer}>
        <Image
          priority
          alt='Обложка'
          className={styles.image}
          height={200}
          sizes='100vw'
          src={article.cover}
          style={{ width: '100%', height: '100%' }}
          width={200}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.text}>
          <div
            className={styles.headline}
            dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
          />
          <p className={styles.description}>{article.description}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default AiryArticlePreview;
