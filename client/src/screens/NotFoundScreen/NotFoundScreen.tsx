import Image from 'next/image';
import Link from 'next/link';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import notFoundImage404 from '../../assets/img/404-light.png';

import styles from './NotFound.module.scss';

export const NotFoundPage = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <Image alt='Не найдено' height={310} quality={90} src={notFoundImage404.src} width={620} />
      <h4 className={styles.headline}>Эта страница не найдена</h4>
      <p>
        Попробуйте другой пункт назначения или вернитесь{' '}
        <Link className={styles.homeLink} href={getPublicUrl.home()}>
          домой
        </Link>
        .
      </p>
    </div>
  </div>
);

export default NotFoundPage;
