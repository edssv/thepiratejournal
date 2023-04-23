import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/ru';

import { Draft, useRemoveDraftMutation } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import Button from '../common/Button/Button';
import ButtonDelete from '../Buttons/ButtonDelete';
import ArticleStats from '../ArticlePreview/ArticleStats/ArticleStats';

import styles from './DraftPreview.module.scss';

const DraftPreview: React.FC<{ draft: Draft }> = ({ draft }) => {
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
              <div className={styles.backgroundColor}></div>
            ) : (
              <div className={styles.backgroundImage}>
                <span className="material-symbols-outlined">image</span>
              </div>
            )}
            {draft.cover && (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                src={draft.cover}
                alt="Обложка"
              />
            )}
          </div>
          <div className={styles.cover__overlay}>
            <div className={styles.controls}>
              <Button onClick={() => push(getPublicUrl.draftEdit(String(draft?.id)))} variant="filled">
                Продолжить создание
              </Button>
              <ButtonDelete
                onPrimaryAction={() => {
                  removeDraft({ variables: { id: Number(draft.id) } });
                }}
                variant="filledTonal"
              >
                Удалить черновик
              </ButtonDelete>
              <span className={styles.timeModified}>{` Последнее изменение: ${time}`}</span>
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <h4>{draft.title ?? ''}</h4>
                <Link href={getPublicUrl.user(String(draft?.user?.id))} className={styles.authorName}>
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
