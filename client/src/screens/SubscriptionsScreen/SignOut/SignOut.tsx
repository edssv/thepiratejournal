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
            focusable='false'
            height='120px'
            preserveAspectRatio='xMidYMid meet'
            viewBox='0 0 24 24'
            width='120px'
          >
            <g>
              <path d='M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z' />
            </g>
          </svg>
        </span>
        <h2 className={styles.title}>Войди в аккаунт</h2>
        <p>Тогда здесь появится контент авторов, на которых ты подписан.</p>
        <Button icon variant='outlined' onClick={() => push(getPublicUrl.login())}>
          <span className='material-symbols-outlined'>account_circle</span>
          Войти
        </Button>
      </div>
    </div>
  );
};
