import React, { MutableRefObject } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../../../components';
import { readingTime } from '../../../../../helpers';
import { useAppDispatch } from '../../../../../hooks';
import {
    Block,
    editorDataSelector,
    modeSelector,
    publishSnackbarVisibleSelector,
    setPublishSnackbarVisible,
    useAddArticleMutation,
    useEditArticleMutation,
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
                saveFromDraft: mode === 'draft',
                draftId: mode === 'draft' && data._id,
            },
            data,
            blocks,
            { readingTime: readingTime(articleContentRef) },
            { description: description }
        );
        mode === 'editing' ? editArticle(formData) : addArticle(formData);
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
                disabled={isLoading || !(data.category && data?.cover)}
                onClick={async () => {
                    try {
                        await saveArticle();
                        dispatch(setPublishSnackbarVisible(true));

                        navigate('/');
                    } catch (err) {}
                }}
                variant="filled"
            >
                {mode === 'editing' ? (isMobile ? 'Обновить' : 'Обновить статью') : 'Опубликовать'}
            </Button>
        </>
    );
};
