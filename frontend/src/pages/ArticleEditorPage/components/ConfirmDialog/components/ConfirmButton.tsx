import React, { MutableRefObject } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../../../components';
import { readingTimeFunction } from '../../../../../helpers';
import { useAppDispatch } from '../../../../../hooks';
import {
    publishSnackbarVisibleSelector,
    selectArticle,
    setPublishSnackbarVisible,
    useAddArticleMutation,
    useEditArticleMutation,
} from '../../../../../redux';

interface ConfirmButtonProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: [];
}

export const ConfirmButton = ({ mode, articleContentRef, blocks }: ConfirmButtonProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const article = useSelector(selectArticle);
    const isPublishSnackbarVisible = useSelector(publishSnackbarVisibleSelector);
    const [addArticle, { isLoading, isSuccess, isError }] = useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();
    const isMobile = useMediaPredicate('(max-width: 551px)');

    const saveArticle = async () => {
        const description = (articleContentRef as MutableRefObject<HTMLDivElement>).current.innerText
            .split('.', 2)
            .toString();

        const formData = Object.assign(
            {
                saveFromDraft: mode === 'isDraft',
                draftId: mode === 'isDraft' && article._id,
            },
            article,
            blocks,

            { intent: 'publish' },
            { readingTime: readingTimeFunction(articleContentRef) },
            { description: description }
        );
        mode === 'isEditing' ? editArticle(formData) : addArticle(formData);
    };

    return (
        <>
            <Snackbar isOpen={isPublishSnackbarVisible} onClose={() => setPublishSnackbarVisible(false)} timeout={5000}>
                {isSuccess
                    ? 'Статья отправлена на проверку и в скором времени будет опубликована.'
                    : isError
                    ? 'Не удалось опубликовать статью'
                    : ''}
            </Snackbar>
            <Button
                isLoading={isLoading}
                disabled={isLoading || !(article.category && article?.cover)}
                onClick={async () => {
                    try {
                        await saveArticle();
                        dispatch(setPublishSnackbarVisible(true));

                        navigate('/');
                    } catch (err) {}
                }}
                variant="filled"
            >
                {mode === 'isEditing' ? (isMobile ? 'Обновить' : 'Обновить статью') : 'Опубликовать'}
            </Button>
        </>
    );
};
