import React, { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { DraftInfoDialog } from '../DraftInfoDialog';
import { TagsInput } from './TagsInput';
import { useArticle } from '../../../hooks';
import { Button, CoverWindow, DialogTrigger as MyDialogTrigger } from '../../../components';
import { ListBoxPicker } from './ListBox';

import styles from './ConfirmDialog.module.scss';
import { ConfirmButton } from './ConfirmButton';

interface ConfirmDialogProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
    setFormStatus: (value: React.SetStateAction<'unchanged' | 'modified' | 'saved'>) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ mode, setFormStatus }) => {
    const { mutableArticle } = useArticle();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const isMobile = useMediaPredicate('(max-width: 551px)');
    const isMobileSmall = useMediaPredicate('(max-width: 397px)');

    return (
        <>
            {' '}
            <Button
                onClick={() => setIsOpen(true)}
                disabled={!mutableArticle.title}
                variant="filled">
                Продолжить
            </Button>
            <MyDialogTrigger title="Последние штрихи" isOpen={isOpen} setIsOpen={setIsOpen}>
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
                        <ConfirmButton mode={mode} />
                    </div>
                </div>
            </MyDialogTrigger>
        </>
    );
};
