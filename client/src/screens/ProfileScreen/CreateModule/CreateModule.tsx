import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button/Button';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './CreateModule.module.scss';

interface CreateModuleProps {
  variant: 'create' | 'find' | 'draft';
}

const CreateModule: React.FC<CreateModuleProps> = ({ variant }) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.promt}>
            <div className={styles.iconAndHeading}>
              <div className={styles.icon}>
                {variant === 'create' || variant === 'draft' ? (
                  <span className='material-symbols-outlined'>add_circle</span>
                ) : (
                  variant === 'find' && <span className='material-symbols-outlined'>search</span>
                )}
              </div>
              <Button
                variant='outlined'
                onClick={() =>
                  variant === ('create' || 'draft') ? router.push(getPublicUrl.articleNew()) : router.push('/articles')
                }
              >
                {variant === 'create' || variant === 'draft' ? 'Написать статью' : 'Найти статьи'}
              </Button>
            </div>
            <div className={styles.text}>
              {variant === 'create' ? (
                <p>
                  Получайте отзывы, просмотры и оценки. Общедоступные проекты также могут быть отмечены как «Популярные»
                  нашими кураторами.
                </p>
              ) : (
                variant === 'draft' && (
                  <p>Ты сможешь получать оценки, а также собирать просмотры на опубликованных статьях.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
