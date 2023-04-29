import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'moment/locale/ru';

import { useRemoveDraftMutation } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import ArticleStats from '../ArticlePreview/ArticleStats/ArticleStats';
import ButtonDelete from '../Buttons/ButtonDelete';
import Button from '../common/Button/Button';

import styles from './DraftPreview.module.scss';

const DraftPreview: React.FC<{ draft: any }> = ({ draft }) => {
  const { push } = useRouter();
  const [removeDraft] = useRemoveDraftMutation();

  const a = moment.utc(draft.createdAt);
  const time = moment(a).local().startOf('hour').fromNow();

  return (
    <div className={styles.root}>
      <div className={styles.cover}>
        <div className={styles.cover__wrapper}>
          <div className={styles.cover__content}>
            {draft.cover ? (
              <div className={styles.backgroundColor} />
            ) : (
              <div className={styles.backgroundImage}>
                <span className='material-symbols-outlined'>image</span>
              </div>
            )}
            {draft.cover && (
              <Image
                alt='Обложка'
                height={0}
                sizes='100vw'
                src={draft.cover}
                style={{ width: '100%', height: '100%' }}
                width={0}
              />
            )}
          </div>
          <div className={styles.cover__overlay}>
            <div className={styles.controls}>
              <Button variant='filled' onClick={() => push(getPublicUrl.draftEdit(String(draft?.id)))}>
                Продолжить создание
              </Button>
              <ButtonDelete
                variant='filledTonal'
                onPrimaryAction={() => {
                  removeDraft({ variables: { id: Number(draft.id) } });
                }}
              >
                Удалить черновик
              </ButtonDelete>
              <span className={styles.timeModified}>{` Последнее изменение: ${time}`}</span>
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <h4>{draft.title ?? ''}</h4>
                <Link className={styles.authorName} href={getPublicUrl.user(String(draft?.user?.id))}>
                  {draft?.user?.id}
                </Link>
              </div>
              <ArticleStats likesCount={0} viewsCount={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftPreview;
