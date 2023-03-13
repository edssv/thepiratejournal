import React, { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../../../components';
import { readingTime } from '../../../../../helpers';
import { useAppDispatch } from '../../../../../hooks';
import {
    articleTypeSelector,
    Block,
    editorDataSelector,
    modeSelector,
    publishSnackbarVisibleSelector,
    setPublishSnackbarVisible,
    useEditBlogMutation,
    usePublishArticleMutation,
    usePublishBlogMutation,
} from '../../../../../redux';

interface ConfirmButtonProps {
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: Block[];
}

export const ConfirmButton = ({ articleContentRef, blocks }: ConfirmButtonProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);
    const mode = useSelector(modeSelector);
    const articleType = useSelector(articleTypeSelector);
    const isPublishSnackbarVisible = useSelector(publishSnackbarVisibleSelector);
    const [publishArticle, { isLoading, isSuccess, isError }] = usePublishArticleMutation();
    const [publishBlog, { isLoading: isLoadingBlog, isSuccess: isSuccesBlog, isError: isErrorBlog }] =
        usePublishBlogMutation();
    const [editBlog] = useEditBlogMutation();

    const saveArticle = async () => {
        const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
            .split('.', 2)
            .toString();

        const formData = Object.assign(
            {
                saveFromDraft: mode === 'draft',
                draftId: mode === 'draft' && data._id,
            },
            data,
            blocks,
            { readingTime: readingTime(articleContentRef) },
            { description: data.description ?? description }
        );

        if (articleType === 'article') {
            if (mode === 'editing') {
                publishArticle(formData);
            }
        }

        if (articleType === 'blog') {
            if (mode === 'new') {
                publishBlog(formData);
            }

            if (mode === 'editing') {
                'isPublished' in data && data.isPublished ? editBlog(formData) : publishBlog(formData);
            }
        }
    };

    const snackbarText = () => {
        if (articleType === 'blog') {
            if (isSuccesBlog) {
                return 'Статья опубликована в блог.';
            }
            if (isErrorBlog) {
                return 'Не удалось опубликовать статью в блог.';
            }
        }

        if (articleType === 'article') {
            if (isSuccess) {
                return 'Статья опубликована.';
            }
            if (isError) {
                return 'Не удалось опубликовать статью.';
            }
        }
    };

    return (
        <>
            <Snackbar isOpen={isPublishSnackbarVisible} onClose={() => setPublishSnackbarVisible(false)} timeout={5000}>
                {snackbarText()}
            </Snackbar>
            <Button
                isLoading={isLoading || isLoadingBlog}
                disabled={isLoading || isLoadingBlog || !(data.category && data?.cover)}
                onClick={async () => {
                    try {
                        await saveArticle();
                        dispatch(setPublishSnackbarVisible(true));

                        navigate('/');
                    } catch (err) {}
                }}
                variant="filled"
            >
                Опубликовать
            </Button>
        </>
    );
};
