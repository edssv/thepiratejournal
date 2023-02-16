import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ActionDialog, Button } from '../../../components';
import { selectArticle, useAddArticleMutation } from '../../../redux';

interface DraftInfoDialogProps {
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
    blocks: [];
}

export const DraftInfoDialog: React.FC<DraftInfoDialogProps> = ({ setFormStatus, blocks }) => {
    const navigate = useNavigate();
    const article = useSelector(selectArticle);
    const [isOpen, setOpen] = useState(false);

    const [addArticle, { isLoading, isSuccess, isError }] = useAddArticleMutation();

    const saveDraft = async () => {
        const formData = Object.assign({ intent: 'draft' }, article, blocks);
        addArticle(formData);
        setFormStatus('saved');
    };

    const isMobile = useMediaPredicate('(max-width: 551px)');

    return (
        <>
            {isMobile ? (
                <Button
                    onClick={async () => {
                        try {
                            await saveDraft();
                            navigate('/');

                            setOpen(true);
                            setTimeout(() => setOpen(false), 500);
                        } catch (error) {}
                    }}
                    isLoading={isLoading}
                    disabled={isLoading || !article.title}
                    variant="filledTonal"
                >
                    Черновик
                </Button>
            ) : (
                <Button
                    onClick={async () => {
                        try {
                            await saveDraft();
                            navigate('/');

                            setOpen(true);
                            setTimeout(() => setOpen(false), 500);
                        } catch (error) {}
                    }}
                    isLoading={isLoading}
                    disabled={isLoading || !article.title}
                    variant="filledTonal"
                >
                    Сохранить как черновик
                </Button>
            )}
            <ActionDialog isOpen={isOpen}>
                {isSuccess ? 'Черновик сохранен' : isError ? 'Не удалось сохранить черновик' : ''}
            </ActionDialog>
        </>
    );
};
