import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { DraftInfoDialog } from '../../components';
import { useArticle } from '../../../../hooks';
import { Button, DialogTrigger } from '../../../../components';
import { ConfirmButton, CoverWindow, ListBoxPicker, TagsInput } from './';

import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: [];
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ mode, setFormStatus, articleContentRef, blocks }) => {
    const { mutableArticle } = useArticle();
    const isMobile = useMediaPredicate('(max-width: 551px)');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    return (
        <>
            {' '}
            <Button onClick={() => setIsOpen(true)} disabled={!mutableArticle.title} variant="filled">
                Продолжить
            </Button>
            <DialogTrigger title="Последние штрихи" isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className={styles.plateContent}>
                    <div>
                        <div className={styles.itemHeadline}>Обложка *</div>
                        <CoverWindow selectedFile={selectedFile} setSelectedFile={setSelectedFile} mode={mode} />
                    </div>
                    <div>
                        <div className={styles.itemHeadline}>Категория *</div>
                        <ListBoxPicker />
                    </div>
                    <div>
                        <div className={styles.itemHeadline}>Теги</div>
                        <TagsInput />
                    </div>
                </div>
                <div className={styles.buttonGroup}>
                    {isMobile ? (
                        <Button onClick={() => setIsOpen(false)} icon variant="outlined">
                            <span className="material-symbols-outlined">undo</span>
                        </Button>
                    ) : (
                        <Button onClick={() => setIsOpen(false)} variant="outlined">
                            Отмена
                        </Button>
                    )}
                    <div className={styles.buttonGroupConfirm}>
                        <DraftInfoDialog setFormStatus={setFormStatus} />
                        <ConfirmButton mode={mode} articleContentRef={articleContentRef} blocks={blocks} />
                    </div>
                </div>
            </DialogTrigger>
        </>
    );
};
