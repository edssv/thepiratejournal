import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@react-spectrum/button';

import styles from './DraftPreview.module.scss';
import { Draft, useDeleteArticleMutation } from '../../redux/services/article';
import Image from '@spectrum-icons/workflow/Image';
import { convertDateMDHM } from '../../helpers';
import { ButtonDelete, ButtonProgress } from '../Buttons';
import { ArticleStats } from '../ArticleStats';

interface DraftPreviewProps {
    draft: Draft;
    refetch: any;
}

export const DraftPreview: React.FC<DraftPreviewProps> = ({ draft, refetch }) => {
    const navigate = useNavigate();

    const [deleteDraft, { isLoading }] = useDeleteArticleMutation();

    const time = convertDateMDHM(draft.timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.cover}>
                <div className={styles.cover__wrapper}>
                    <div className={styles.cover__content}>
                        {draft.cover ? (
                            <div className={styles.backgroundColor}></div>
                        ) : (
                            <div className={styles.backgroundImage}>
                                <Image size="XXL" />
                            </div>
                        )}
                        <img src={draft.cover} loading="lazy" />
                    </div>
                    <div className={styles.cover__overlay}>
                        <div className={styles.controls}>
                            <Button
                                onPress={() => navigate(`/drafts/${draft._id}/edit`)}
                                variant="accent"
                                marginBottom="10px">
                                Продолжить создание
                            </Button>
                            <ButtonDelete
                                onPrimaryAction={() => {
                                    deleteDraft(draft._id).then(refetch(draft._id));
                                }}
                                variant="primary"
                                staticColor="white"
                                style="fill">
                                Удалить черновик
                            </ButtonDelete>
                            <span className={styles.timeModified}>
                                {` Последнее изменение ${time}`}
                            </span>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.info}>
                                <h4>{draft.title ? draft.title : ''}</h4>
                                <Link to="/" className={styles.authorName}>
                                    {draft.author.username}
                                </Link>
                            </div>
                            <ArticleStats viewsCount={0} likesCount={0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
