import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { robotoMono } from '@/components/fonts/roboto-mono';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  createdAt: Date;
  featured?: boolean;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  id,
  title,
  description,
  cover,
  createdAt,
  featured = false,
}) => {
  const TitleTag = featured ? 'h1' : 'h2';
  const date = moment(createdAt).format('DD.MM.YY');

  return (
    <div className={clsx(styles.root, featured && styles.featured)}>
      <Link href={getPublicUrl.blog(String(id))}>
        <div className={styles.article}>
          <div className={styles.articleContent}>
            <TitleTag className={styles.title}>{title}</TitleTag>
            <div className={styles.subcontent}>
              <div
                className={clsx(
                  styles.date,
                  robotoMono.style.fontFamily,
                  robotoMono.className,
                  robotoMono.variable,
                  robotoMono.style.fontWeight
                )}
              >
                {date}
              </div>
              <div className={styles.description}>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className={styles.articleImage}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
              priority={featured}
              src={cover}
              alt="Обложка"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
