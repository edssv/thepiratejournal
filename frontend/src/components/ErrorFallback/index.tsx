import styles from './ErrorFallback.module.scss';

import errorImage from '../../assets/img/500.png';

export const ErrorFallback = () => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <h3 className={styles.headline}>500 Внутренняя ошибка</h3>
                <p>
                    Что-то пошло не так.
                    <br /> Пожалуйста, попробуйте позже.
                </p>
            </div>
            <img src={errorImage} alt="Внутренняя ошибка" />
        </div>
    );
};
