import { useNavigate } from 'react-router-dom';
import { Button } from '../Buttons';

import logo from '../../assets/img/logotype.png';
import styles from './Footer.module.scss';

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className={styles.stickyFooter}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.contentImage}>
                        <img src={logo} alt="The Pirate Journal" />
                    </div>
                    <div className={styles.contentText}>
                        <h4 className={styles.headline}>Присоединяйся к The Pirate Journal!</h4>
                        <p className={styles.paragraph}>
                            {' '}
                            Открой для себя новый контент в любом месте.
                        </p>
                    </div>
                </div>

                <Button onClick={() => navigate('/signup')} variant="filledTonal">
                    Зарегистрироваться
                </Button>
            </div>
        </footer>
    );
};
