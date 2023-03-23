import Link from 'next/link';

import notFoundImage404 from '../../assets/img/404-light.png';
import styles from './NotFound.module.scss';

export const NotFoundPage = () => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <img src={notFoundImage404.src} alt="Не найдено" />
                <h4 className={styles.headline}>Эта страница не найдена</h4>
                <p>
                    Попробуйте другой пункт назначения или вернитесь{' '}
                    <Link href="/" className={styles.homeLink}>
                        домой
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
