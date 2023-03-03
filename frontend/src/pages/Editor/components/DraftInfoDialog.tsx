import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../components';
import { useAppDispatch } from '../../../hooks';
import { Block, editorDataSelector, selectArticle, setFormStatus, useCreateDraftMutation } from '../../../redux';

interface DraftInfoDialogProps {
    blocks: Block[];
}

export const DraftInfoDialog: React.FC<DraftInfoDialogProps> = ({ blocks }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);
    const [isOpen, setOpen] = useState(false);
    const [creatDraft, { isLoading, isSuccess, isError }] = useCreateDraftMutation();

    const saveDraft = async () => {
        const formData = { ...data, ...blocks };

        creatDraft(formData);
        dispatch(setFormStatus('saved'));
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
                    disabled={isLoading || !data.title}
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
                    disabled={isLoading || !data.title}
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
