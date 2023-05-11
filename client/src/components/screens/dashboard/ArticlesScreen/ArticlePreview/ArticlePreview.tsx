import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import 'moment/locale/ru';
import { ArticleOperations } from '@/components/ArticleOperations/ArticleOperations';
import { plural } from '@/helpers';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  id: string;
  title: string;
  cover: string;
  createdAt: Date;
  viewsCount: number;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ cover, createdAt, id, title, viewsCount }) => (
  <div className='flex items-center justify-between border-outline-variant py-4'>
    <div className='flex gap-4'>
      <Link href={getPublicUrl.article(id)}>
        <Image
          alt='Обложка'
          className={clsx(styles.cover, 'sm:h-16 sm:w-16')}
          height={70}
          src={cover}
          width={120}
          sizes='(max-width: 768px) 30vw,
          (max-width: 1200px) 15vw,
          15vw'
        />
      </Link>
      <div>
        <Link className='line inline-block font-medium leading-6 hover:underline' href={getPublicUrl.article(id)}>
          {title}
        </Link>
        <p className='text-muted-foreground text-sm text-on-surface-variant'>
          {moment(createdAt).format('DD.MM.YYYY')}
        </p>

        <span className='flex items-center gap-1'>
          {viewsCount} {plural(viewsCount, ['просмотр', 'просмотра', 'просмотров', 'просмотров'])}
        </span>
      </div>
    </div>
    <ArticleOperations id={+id} />
  </div>
);

export default ArticlePreview;
