import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaPredicate } from 'react-media-hook';

import { selectArticle, useEditArticleMutation } from '../../../redux';
import { ActionDialog, Button } from '../../../components';

interface SaveChangesButtonProps {
    blocks: [];
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
}

export const SaveChangesButton: React.FC<SaveChangesButtonProps> = ({ blocks, setFormStatus }) => {
    const article = useSelector(selectArticle);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [editArticle, { isLoading, isSuccess, isError }] = useEditArticleMutation();

    const saveChanges = async () => {
        const formData = Object.assign({ readingTime: 0 }, article, blocks);

        await editArticle({ data: formData, id: article._id });
        setFormStatus('saved');
    };

    const onClickButton = async () => {
        await saveChanges();
        setIsOpen(true);

        if (!isLoading) {
            if (!isError) {
                navigate(-1);
            }
        }

        setTimeout(() => setIsOpen(false), 5000);
    };

    const isMobile = useMediaPredicate('(max-width: 551px)');

    return (
        <>
            {isMobile ? (
                <Button
                    onClick={onClickButton}
                    isLoading={isLoading}
                    disabled={isLoading || !article.title}
                    variant="filledTonal"
                >
                    <span className="material-symbols-outlined">save_as</span> Сохранить изменения
                </Button>
            ) : (
                <Button
                    onClick={onClickButton}
                    isLoading={isLoading}
                    disabled={isLoading || !article.title}
                    variant="filledTonal"
                >
                    Сохранить изменения
                </Button>
            )}
            <ActionDialog
                isOpen={isOpen}
                actionText={isSuccess ? 'Изменения сохранены' : isError ? 'Не удалось сохранить изменения' : ''}
            />
        </>
    );
};
