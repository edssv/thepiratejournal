import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { ActionDialog, Button } from '../../components';
import { useAddArticleMutation } from '../../redux';
import { useArticle } from '../../hooks';

interface DraftInfoDialogProps {
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
}

export const DraftInfoDialog: React.FC<DraftInfoDialogProps> = ({ setFormStatus }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const { mutableArticle } = useArticle();
    const [addArticle, { isLoading, isSuccess, isError }] = useAddArticleMutation();

    const saveDraft = async () => {
        const formData = Object.assign({ intent: 'draft' }, mutableArticle);
        addArticle(formData);
        setFormStatus('saved');
    };

    const onClickButton = () => {
        saveDraft();
        setOpen(true);
    };

    const isMobile = useMediaPredicate('(max-width: 551px)');

    return (
        <>
            {isMobile ? (
                <Button
                    onClick={onClickButton}
                    isLoading={isLoading}
                    disabled={isLoading || !mutableArticle.title}
                    variant="filledTonal">
                    <span className="material-symbols-outlined">save_as</span> Черновик
                </Button>
            ) : (
                <Button
                    onClick={onClickButton}
                    isLoading={isLoading}
                    disabled={isLoading || !mutableArticle.title}
                    variant="filledTonal">
                    Сохранить как черновик
                </Button>
            )}
            <ActionDialog
                isOpen={isOpen}
                setIsOpen={setOpen}
                actionText={
                    isSuccess ? 'Черновик сохранен' : isError ? 'Не удалось сохранить черновик' : ''
                }
            />
        </>
    );
};
