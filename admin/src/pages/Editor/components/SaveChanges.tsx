import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Snackbar, Button } from '../../../components';
import { useAppDispatch } from '../../../hooks';
import { Block, editorDataSelector, setFormStatus, useSaveChangesBlogMutation } from '../../../redux';

interface DraftInfoDialogProps {
    blocks: Block[];
}

export const SaveChanges: React.FC<DraftInfoDialogProps> = ({ blocks }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);
    const [isOpen, setOpen] = useState(false);
    const [saveChanges, { isLoading, isSuccess, isError }] = useSaveChangesBlogMutation();

    const save = async () => {
        const formData = { ...data, ...blocks };

        saveChanges(formData);
        dispatch(setFormStatus('saved'));
    };

    const isMobile = useMediaPredicate('(max-width: 551px)');

    return (
        <>
            {isMobile ? (
                <Button
                    onClick={async () => {
                        try {
                            await save();
                            navigate('/');
                        } catch (error) {}
                    }}
                    isLoading={isLoading}
                    disabled={isLoading || !data.title}
                    variant="filledTonal"
                >
                    Сохранить
                </Button>
            ) : (
                <Button
                    onClick={async () => {
                        try {
                            await save();
                            navigate('/');
                        } catch (error) {}
                    }}
                    isLoading={isLoading}
                    disabled={isLoading || !data.title}
                    variant="filledTonal"
                >
                    Сохранить изменения
                </Button>
            )}
            <Snackbar isOpen={isOpen} close onClose={() => setOpen(false)}>
                {isSuccess ? 'Изменения сохранены' : isError ? 'Не удалось сохранить изменения' : ''}
            </Snackbar>
        </>
    );
};
