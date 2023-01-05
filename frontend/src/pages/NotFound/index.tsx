import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

import notFoundImage from '../../assets/img/404-computer.png';

import styles from './NotFound.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <img src={notFoundImage} alt="Не найдено" />
                <h4 className={styles.headline}>404 Not Found</h4>
                <p>Упс! Эта страница не существует.</p>
                <Button onClick={() => navigate('/')} variant="filledTonal">
                    Вернуться домой
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
