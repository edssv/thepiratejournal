import { useRouter } from 'next/router';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './SignOut.module.scss';

export const SignOut = () => {
  const { push } = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.icon}>
          <svg
            fill='#000000'
            height='120px'
            viewBox='0 0 16 16'
            width='120px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0' />
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
            <g id='SVGRepo_iconCarrier'>
              <path
                clipRule='evenodd'
                d='M13.507 12.324a7 7 0 0 0 .065-8.56A7 7 0 0 0 2 4.393V2H1v3.5l.5.5H5V5H2.811a6.008 6.008 0 1 1-.135 5.77l-.887.462a7 7 0 0 0 11.718 1.092zm-3.361-.97l.708-.707L8 7.792V4H7v4l.146.354 3 3z'
                fillRule='evenodd'
              />
            </g>
          </svg>
        </span>
        <h2 className={styles.title}>История просмотра недоступна</h2>
        <p>Чтобы посмотреть историю просмотра, войди в аккаунт.</p>
        <Button icon variant='outlined' onClick={() => push(getPublicUrl.login())}>
          <span className='material-symbols-outlined'>account_circle</span>
          Войти
        </Button>
      </div>
    </div>
  );
};
