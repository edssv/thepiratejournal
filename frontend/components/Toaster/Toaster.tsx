import styles from './Toaster.module.scss';

export const Toaster = () => {
    return (
        <div className={styles.root}>
            <div className={styles.label}>
                <span className="material-symbols-outlined">flight</span>
                <p>
                    Ваш компьютер работает в автономном режиме.
                    <br /> Проверьте подключение к Интернету и повторите попытку.
                </p>
            </div>
        </div>
    );
};
