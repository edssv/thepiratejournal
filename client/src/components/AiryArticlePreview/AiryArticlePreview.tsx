import Link from 'next/link';
import Image from 'next/image';

import { ArticlePreview } from '@/gql/__generated__';

import styles from './AiryArticlePreview.module.scss';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

interface ArticlePreviewProps {
  article: ArticlePreview;
  size?: 'S' | 'M';
}

const AiryArticlePreview: React.FC<ArticlePreviewProps> = ({ article, size = 'S' }) => {
  return (
    <div className={`${styles.root} ${size === 'S' ? styles.sizeSmall : styles.sizeMedium}`}>
      <Link href={getPublicUrl.article(article.id)} className={styles.thumbnail}>
        {' '}
        <div className={styles.thumbContainer}>
          <Image
            width={200}
            height={200}
            priority
            sizes="100vw"
            src={article.cover}
            className={styles.image}
            style={{ width: '100%', height: '100%' }}
            alt="Обложка"
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.text}>
            <div className={styles.headline} dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }} />
            <p className={styles.description}>{article.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AiryArticlePreview;
