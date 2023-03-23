import moment from 'moment';
import 'moment/locale/ru';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Draft, useDeleteArticleMutation } from '@/store';
import Button from '../Buttons/Button/Button';
import ButtonDelete from '../Buttons/ButtonDelete';
import ArticleStats from '../ArticlePreview/components/ArticleStats/ArticleStats';

import styles from './DraftPreview.module.scss';

interface DraftPreviewProps {
    draft: Draft;
    refetch: any;
}

const DraftPreview: React.FC<DraftPreviewProps> = ({ draft, refetch }) => {
    const { push } = useRouter();
    const [deleteDraft] = useDeleteArticleMutation();

    const time = moment(draft.createdAt).fromNow();

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
                            <Button onClick={() => push(`/drafts/${draft._id}/edit`)} variant="filled">
                                Продолжить создание
                            </Button>
                            <ButtonDelete
                                onPrimaryAction={() => {
                                    deleteDraft(draft._id).then(refetch(draft._id));
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
                                    {draft.author.username}
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
