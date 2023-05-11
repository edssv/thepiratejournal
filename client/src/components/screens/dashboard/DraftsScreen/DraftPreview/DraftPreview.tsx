import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import 'moment/locale/ru';
import { DraftOperations } from '@/components/DraftOperations/DraftOperations';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './DraftPreview.module.scss';

interface DraftPreviewProps {
  id: string;
  title?: string | null;
  cover?: string | null;
  createdAt: Date;
}

const DraftPreview: React.FC<DraftPreviewProps> = ({ cover, createdAt, id, title }) => (
  <div className='flex items-center justify-between border-outline-variant py-3'>
    <div className='flex gap-4'>
      <Link href={getPublicUrl.article(id)}>
        {cover ? (
          <Image
            alt='Обложка'
            className={styles.cover}
            height={60}
            src={cover}
            width={64}
            sizes='(max-width: 768px) 30vw,
          (max-width: 1200px) 10vw,
          5vw'
          />
        ) : (
          <div className='flex h-16 w-16 justify-center'>
            <span className='material-symbols-outlined !text-3xl text-on-surface-variant'>image</span>
          </div>
        )}
      </Link>
      <div>
        <Link className='line inline-block font-medium leading-6 hover:underline' href={getPublicUrl.article(id)}>
          {title ?? 'Без имени'}
        </Link>
        <p className='text-muted-foreground text-sm text-on-surface-variant'>
          {moment(createdAt).format('DD.MM.YYYY')}
        </p>
      </div>
    </div>
    <DraftOperations id={+id} />
  </div>
);

export default DraftPreview;
