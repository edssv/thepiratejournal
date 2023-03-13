import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';

import { useSelector } from 'react-redux';
import { Block, editorDataSelector } from '../../../../redux';
import { DraftInfoDialog } from '../../components';
import { Button, DialogTrigger } from '../../../../components';
import { ConfirmButton, CoverWindow, DescriptionArea, ListBoxPicker, TagsInput } from './';

import styles from './ConfirmDialog.module.scss';
import { Dialog, DialogCancelButton, DialogContent, DialogControls, DialogTitle } from '../../../../components/Dialog';

interface ConfirmDialogProps {
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: Block[];
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ articleContentRef, blocks }) => {
    const data = useSelector(editorDataSelector);
    const isMobile = useMediaPredicate('(max-width: 551px)');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    return (
        <>
            {' '}
            <Button onClick={() => setIsOpen(true)} disabled={!data.title} variant="filled">
                Продолжить
            </Button>
            <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
                <Dialog size="L" mobileType="fullscreen">
                    <DialogContent>
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
                                <div className={styles.itemHeadline}>Описание</div>
                                <DescriptionArea />
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
                            <DraftInfoDialog blocks={blocks} />
                            <ConfirmButton articleContentRef={articleContentRef} blocks={blocks} />
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
