import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { readingTimeFunction } from '../../../../../helpers';
import { selectArticle, usePublishArticleMutation } from '../../../../../redux';
import { ActionDialog, Button } from '../../../../../components';

interface ConfirmButtonProps {
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: [];
}

export const ConfirmButton = ({ articleContentRef, blocks }: ConfirmButtonProps) => {
    const navigate = useNavigate();
    const article = useSelector(selectArticle);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [publishArticle, { isLoading, isSuccess, isError }] = usePublishArticleMutation();

    const saveArticle = async () => {
        const formData = Object.assign({ readingTime: readingTimeFunction(articleContentRef) }, article, blocks);

        publishArticle({ data: formData, id: article._id });
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
                actionText={isSuccess ? 'Статья опубликована' : isError ? 'Не удалось опубликовать статью' : ''}
            />
            <Button
                isLoading={isLoading}
                disabled={isLoading || !(article.category && article?.cover)}
                onClick={onClickSave}
                variant="filled"
            >
                Опубликовать
            </Button>
        </>
    );
};
