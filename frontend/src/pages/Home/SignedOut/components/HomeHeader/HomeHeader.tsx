import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../../components';

import styles from './HomeHeader.module.scss';

export const HomeHeader = () => {
    const navigate = useNavigate();

    return (
        <div id="homeHeader" className={styles.root}>
            <div className={styles.wrapper}>
                <div className={styles.text}>
                    <h2>Начни чтение</h2>
                    <p className={styles.description}>
                        Присоединяйся к The Pirate Journal. Открой для себя новый контент, возможность делиться и
                        обсуждать новые статьи.
                    </p>
                </div>
                <Button onClick={() => navigate('/signup')} variant="filled">
                    Читать
                </Button>
            </div>
        </div>
    );
};
