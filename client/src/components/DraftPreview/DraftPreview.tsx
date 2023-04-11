import moment from 'moment';
import 'moment/locale/ru';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useDeleteDraftMutation } from '@/services';
import { Article } from '@/interfaces/article.interface';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import Button from '../common/Button/Button';
import ButtonDelete from '../Buttons/ButtonDelete';
import ArticleStats from '../ArticlePreview/ArticleStats/ArticleStats';

import styles from './DraftPreview.module.scss';

const DraftPreview: React.FC<{ draft: Partial<Article> }> = ({ draft }) => {
  const { push } = useRouter();
  const { mutate: deleteDraft } = useDeleteDraftMutation();

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
            <img src={draft.cover} alt="Обложка" />
          </div>
          <div className={styles.cover__overlay}>
            <div className={styles.controls}>
              <Button onClick={() => push(getPublicUrl.draftEdit(String(draft?.id)))} variant="filled">
                Продолжить создание
              </Button>
              <ButtonDelete
                onPrimaryAction={() => {
                  deleteDraft(String(draft.id));
                }}
                variant="filledTonal"
              >
                Удалить черновик
              </ButtonDelete>
              <span className={styles.timeModified}>{` Последнее изменение: ${time}`}</span>
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <h4>{draft.title ? draft.title : ''}</h4>
                <Link href="/" className={styles.authorName}>
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
