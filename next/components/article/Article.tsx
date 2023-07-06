import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import 'moment/locale/ru';

import { robotoMono } from '@/app/layout';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './Article.module.scss';

interface ArticleProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  createdAt: string;
  featured?: boolean;
  priority: boolean;
}

export const Article: React.FC<ArticleProps> = ({
  cover,
  createdAt,
  description,
  featured = false,
  id,
  priority,
  title
}) => {
  const TitleTag = featured ? 'h1' : 'h2';
  const date = moment(createdAt).format('DD.MM.YY');

  return (
    <div className={clsx(styles.root, featured && styles.featured)}>
      <Link href={getPublicUrl.blog(id)}>
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
              alt='Обложка'
              height={0}
              priority={priority || featured}
              sizes='100vw'
              src={cover}
              style={{ height: '100%', width: '100%' }}
              width={0}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
