import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { useSelector } from 'react-redux';
import { selectArticle } from '../../../../redux';
import { DraftInfoDialog } from '../../components';
import { Button, DialogTrigger } from '../../../../components';
import { ConfirmButton, CoverWindow, ListBoxPicker, TagsInput } from './';

import styles from './ConfirmDialog.module.scss';
import { Dialog, DialogCancelButton, DialogContent, DialogControls, DialogTitle } from '../../../../components/Dialog';

interface ConfirmDialogProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: [];
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ mode, setFormStatus, articleContentRef, blocks }) => {
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
            <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
                <Dialog size="L" mobileType="fullscreen">
                    <DialogTitle>Последние штрихи</DialogTitle>
                    <DialogContent>
                        <div className={styles.plateContent}>
                            <div>
                                <div className={styles.itemHeadline}>Обложка *</div>
                                <CoverWindow
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    mode={mode}
                                />
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
                    </DialogContent>
                    <DialogControls className={styles.controls}>
                        <DialogCancelButton onClick={() => setIsOpen(false)} variant="outlined">
                            {isMobile ? <span className="material-symbols-outlined">undo</span> : 'Отмена'}
                        </DialogCancelButton>
                        <div className={styles.draftAndSaveButtons}>
                            <DraftInfoDialog setFormStatus={setFormStatus} blocks={blocks} />
                            <ConfirmButton mode={mode} articleContentRef={articleContentRef} blocks={blocks} />
                        </div>
                    </DialogControls>
                </Dialog>

                <div className={styles.buttonGroup}>
                    <div className={styles.buttonGroupConfirm}></div>
                </div>
            </DialogTrigger>
        </>
    );
};
