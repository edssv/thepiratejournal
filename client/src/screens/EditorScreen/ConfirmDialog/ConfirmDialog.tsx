import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaPredicate } from 'react-media-hook';

import { Block } from '@/interfaces/block.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import { Dialog, DialogCancelButton, DialogContent, DialogControls } from '@/components/common/Dialog/Dialog';
import { DraftInfoDialog } from '../DraftInfoDialog/DraftInfoDialog';
import { CoverWindow } from './CoverWindow/CoverWindow';
import { ListBoxPicker } from './ListBoxPicker/ListBoxPicker';
import { DescriptionArea } from './DescriptionArea/DescriptionArea';
import { TagsInput } from './TagsInput/TagsInput';

import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
    articleContentRef?: React.Ref<HTMLDivElement>;
    blocks: Block[];
}

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });
const ConfirmButton = dynamic(() => import('./ConfirmButton/ConfirmButton'), { ssr: false });

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ articleContentRef, blocks }) => {
    const { data } = useTypedSelector((state) => state.editorPage);
    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useMediaPredicate('(max-width: 551px)');

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
                                <CoverWindow />
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
