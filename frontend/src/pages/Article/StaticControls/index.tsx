import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../redux';
import debounce from 'lodash.debounce';
import { ButtonDelete, ButtonLike } from '../../../components';
import { Button, ButtonGroup, Divider } from '@adobe/react-spectrum';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';
import Delete from '@spectrum-icons/workflow/Delete';
import Edit from '@spectrum-icons/workflow/Edit';
import Reply from '@spectrum-icons/workflow/Reply';

import styles from './StaticControls.module.scss';

interface StaticControlsProps {
    articleId: string | undefined;
    isLiked: boolean | undefined;
    isOwner: boolean | undefined;
}

export const StaticControls: React.FC<StaticControlsProps> = ({ articleId, isLiked, isOwner }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location?.state?.from?.pathname;

    const [deleteArticle] = useDeleteArticleMutation();

    return (
        <div className={styles.root}>
            <ButtonGroup orientation="horizontal" UNSAFE_className={styles.buttonGroup}>
                <ButtonLike isLiked={isLiked} id={articleId} tooltipPosition="left" />
                <Button variant="secondary">
                    <BookmarkSingle size="XS" />
                </Button>
                <Button variant="secondary">
                    <Reply />
                </Button>
                {isOwner && (
                    <>
                        <Divider size="S" orientation="vertical" margin="0px 16px" />
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
                    </>
                )}
            </ButtonGroup>
        </div>
    );
};
