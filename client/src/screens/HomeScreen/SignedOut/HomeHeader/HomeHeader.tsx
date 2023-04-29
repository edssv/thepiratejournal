import { useRouter } from 'next/router';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './HomeHeader.module.scss';

export const HomeHeader = () => {
  const { push } = useRouter();

  return (
    <div className={styles.root} id='homeHeader'>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h2>Начни чтение</h2>
          <p className={styles.description}>
            Присоединяйся к The Pirate Journal. Открой для себя новый контент, возможность делиться
            и обсуждать новые статьи.
          </p>
        </div>
        <Button variant='filled' onClick={() => push(getPublicUrl.signup())}>
          Читать
        </Button>
      </div>
    </div>
  );
};
