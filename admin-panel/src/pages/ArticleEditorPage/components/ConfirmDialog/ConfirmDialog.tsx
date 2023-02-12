import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaPredicate } from 'react-media-hook';

import { selectArticle } from '../../../../redux';
import { SaveChangesButton } from '../../components';
import { Button, DialogTrigger } from '../../../../components';
import { ConfirmButton, CoverWindow, ListBoxPicker, TagsInput } from './';

import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
    blocks: [];
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
    articleContentRef?: React.Ref<HTMLDivElement>;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ blocks, setFormStatus, articleContentRef }) => {
    const article = useSelector(selectArticle);
    const isMobile = useMediaPredicate('(max-width: 551px)');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    return (
        <>
            {' '}
            <Button onClick={() => setIsOpen(true)} disabled={!article.title} variant="filled">
                Продолжить
            </Button>
            <DialogTrigger title="Последние штрихи" isOpen={isOpen} setIsOpen={setIsOpen}>
                <div className={styles.plateContent}>
                    <div>
                        <div className={styles.itemHeadline}>Обложка *</div>
                        <CoverWindow selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
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
                        <SaveChangesButton blocks={blocks} setFormStatus={setFormStatus} />
                        <ConfirmButton articleContentRef={articleContentRef} blocks={blocks} />
                    </div>
                </div>
            </DialogTrigger>
        </>
    );
};
