import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../components';
import { Block, selectArticle, useCreateDraftMutation } from '../../../redux';

interface DraftInfoDialogProps {
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
    blocks: Block[];
}

export const DraftInfoDialog: React.FC<DraftInfoDialogProps> = ({ setFormStatus, blocks }) => {
    const navigate = useNavigate();
    const article = useSelector(selectArticle);
    const [isOpen, setOpen] = useState(false);
    const [creatDraft, { isLoading, isSuccess, isError }] = useCreateDraftMutation();

    const saveDraft = async () => {
        console.log(blocks);
        const formData = { ...article, ...blocks };

        creatDraft(formData);
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
                        } catch (error) {}
                    }}
                    isLoading={isLoading}
                    disabled={isLoading || !article.title}
                    variant="filledTonal"
                >
                    Сохранить как черновик
                </Button>
            )}
            <Snackbar isOpen={isOpen} close onClose={() => setOpen(false)}>
                {isSuccess ? 'Черновик сохранен' : isError ? 'Не удалось сохранить черновик' : ''}
            </Snackbar>
        </>
    );
};
