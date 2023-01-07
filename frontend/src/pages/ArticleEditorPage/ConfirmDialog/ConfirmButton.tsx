import { useEffect, useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useNavigate } from 'react-router-dom';
import { ActionDialog, Button } from '../../../components';
import { useArticle } from '../../../hooks';
import { useAddArticleMutation, useEditArticleMutation } from '../../../redux';

interface ConfirmButtonProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
}

export const ConfirmButton = ({ mode }: ConfirmButtonProps) => {
    const navigate = useNavigate();

    const { mutableArticle } = useArticle();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [addArticle, { isLoading, isSuccess, isError }] = useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();

    const isMobile = useMediaPredicate('(max-width: 551px)');

    const saveArticle = async () => {
        const formData = Object.assign(
            {
                saveFromDraft: mode === 'isDraft',
                draftId: mode === 'isDraft' && mutableArticle._id,
            },
            { intent: 'publish' },
            mutableArticle,
        );
        mode === 'isEditing'
            ? editArticle({ formData, id: mutableArticle._id })
            : addArticle(formData);
    };

    const onClickSave = async () => {
        await saveArticle();
        setIsOpen(true);

        if (!isLoading) {
            if (!isError) {
                navigate(-1);
            }
        }

        setTimeout(() => setIsOpen(false), 5000);
    };

    return (
        <>
            <ActionDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                actionText={
                    isSuccess
                        ? 'Статья опубликована'
                        : isError
                        ? 'Не удалось опубликовать статью'
                        : ''
                }
            />
            <Button
                isLoading={isLoading}
                disabled={isLoading || !(mutableArticle.category && mutableArticle?.cover)}
                onClick={onClickSave}
                variant="filled">
                {mode === 'isEditing'
                    ? isMobile
                        ? 'Обновить'
                        : 'Обновить статью'
                    : 'Опубликовать'}
            </Button>
        </>
    );
};
