import { useRouter } from 'next/router';

import { getPublicUrl } from '@/lib/publicUrlBuilder';
import Button from '@/components/common/Button/Button';

import styles from './SignOut.module.scss';

export const SignOut = () => {
  const { push } = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.icon}>
          <svg fill="#000000" width="120px" height="120px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                fillRule="evenodd"
                d="M10,19.118034 L3,22.618034 L3,7 C3,5.8954305 3.8954305,5 5,5 L15,5 C16.1045695,5 17,5.8954305 17,7 L17,22.618034 L10,19.118034 Z M5,19.381966 L10,16.881966 L15,19.381966 L15,7 L5,7 L5,19.381966 Z M8.00027023,3 C8.01800608,1.89235536 8.9065233,1 10,1 L19,1 C20.1045695,1 21,1.91055224 21,3.03377535 L21,18.9324493 L19,17.9155616 L19,3 L8.00027023,3 Z"
              ></path>{' '}
            </g>
          </svg>
        </span>
        <h2 className={styles.title}>Войди в аккаунт</h2>
        <p>Здесь ты увидишь статьи, добавленные в закладки.</p>
        <Button onClick={() => push(getPublicUrl.login())} icon variant="outlined">
          <span className="material-symbols-outlined">account_circle</span>
          Войти
        </Button>
      </div>
    </div>
  );
};
