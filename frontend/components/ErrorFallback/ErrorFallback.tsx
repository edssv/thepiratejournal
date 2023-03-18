import styles from './ErrorFallback.module.scss';

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
            <img src="../../assets/img/500.png" alt="Внутренняя ошибка" />
        </div>
    );
};
