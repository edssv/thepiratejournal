import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../redux';
import { ButtonBookmark, ButtonDelete, ButtonLike } from '../../../components';
import { Button } from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import Edit from '@spectrum-icons/workflow/Edit';
import Reply from '@spectrum-icons/workflow/Reply';

import styles from './StaticControls.module.scss';

interface StaticControlsProps {
    articleId: string | undefined;
    isLiked: boolean | undefined;
    hasBookmark: boolean | undefined;
    isOwner: boolean | undefined;
}

export const StaticControls: React.FC<StaticControlsProps> = ({
    articleId,
    isLiked,
    hasBookmark,
    isOwner,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location?.state?.from?.pathname;

    const [deleteArticle] = useDeleteArticleMutation();

    return (
        <div className={styles.root}>
            <div className={styles.buttonGroup}>
                <div className={styles.controls}>
                    <ButtonLike isLiked={isLiked} id={articleId} tooltipPosition="left" />
                    <ButtonBookmark hasBookmark={hasBookmark} id={articleId} />
                    <Button variant="secondary">
                        <Reply />
                    </Button>
                </div>
                {isOwner && (
                    <>
                        <div className={styles.ownerControls}>
                            <Button
                                variant="secondary"
                                onPress={() =>
                                    navigate(`/articles/${articleId}/edit`, {
                                        state: { from: location },
                                    })
                                }>
                                <Edit />
                            </Button>
                            <ButtonDelete
                                onPrimaryAction={() => {
                                    deleteArticle(articleId);
                                    navigate(fromPage ? fromPage : '/');
                                }}
                                variant="secondary">
                                <Delete />
                            </ButtonDelete>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
