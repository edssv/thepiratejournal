import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import { Draft, useDeleteArticleMutation } from '../../redux';
import { ArticleStats, Button, ButtonDelete } from '..';

import styles from './DraftPreview.module.scss';

interface DraftPreviewProps {
    draft: Draft;
    refetch: any;
}

export const DraftPreview: React.FC<DraftPreviewProps> = ({ draft, refetch }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
                            <Button
                                onClick={() => navigate(`/drafts/${draft._id}/edit`, { state: { from: location } })}
                                variant="filled"
                            >
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
                                <Link to="/" className={styles.authorName}>
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
