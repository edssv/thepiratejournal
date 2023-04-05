import Link from 'next/link';
import Image from 'next/image';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import notFoundImage404 from '../../assets/img/404-light.png';
import styles from './NotFound.module.scss';

export const NotFoundPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <Image width={620} height={310} src={notFoundImage404.src} quality={90} alt="Не найдено" />
                <h4 className={styles.headline}>Эта страница не найдена</h4>
                <p>
                    Попробуйте другой пункт назначения или вернитесь{' '}
                    <Link href={getPublicUrl.home()} className={styles.homeLink}>
                        домой
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
