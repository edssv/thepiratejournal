import Image from 'next/image';

import styles from './ErrorFallback.module.scss';

const ErrorFallback = () => (
  <div className={styles.root}>
    <div className={styles.content}>
      <h3 className={styles.headline}>500 Внутренняя ошибка</h3>
      <p>
        Что-то пошло не так.
        <br /> Пожалуйста, попробуйте позже.
      </p>
    </div>
    <Image
      alt='Внутренняя ошибка'
      height={0}
      sizes='100vw'
      src='../../assets/img/500.png'
      style={{ width: '100%', height: '100%' }}
      width={0}
    />
  </div>
);

export default ErrorFallback;
