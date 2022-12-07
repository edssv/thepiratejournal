import { ActionButton, Button, Content, Heading, IllustratedMessage } from '@adobe/react-spectrum';
import NotFound from '@spectrum-icons/illustrations/NotFound';
import { useNavigate } from 'react-router-dom';

import notFoundImage from '../../assets/img/404-computer.svg';

import styles from './NotFound.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <img src={notFoundImage} />
                <h3 className={styles.headline}>404 Not Found</h3>
                <p>Упс! Эта страница не существует.</p>
                <ActionButton onPress={() => navigate('/')} marginTop={18}>
                    Вернуться домой
                </ActionButton>
            </div>
        </div>
    );
};

export default NotFoundPage;
