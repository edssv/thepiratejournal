import { Link, useNavigate } from 'react-router-dom';

import notFoundImage404 from '../../assets/img/404-light.png';

import styles from './NotFound.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <img src={notFoundImage404} alt="Не найдено" />
                <h4 className={styles.headline}>Эта страница не найдена</h4>
                <p>
                    Попробуйте другой пункт назначения или вернитесь{' '}
                    <Link to="/" className={styles.homeLink}>
                        домой
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
