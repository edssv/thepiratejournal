import React, { useState } from 'react';
import { Content, Dialog, DialogTrigger, Heading, Item, Picker } from '@adobe/react-spectrum';
import { useMediaPredicate } from 'react-media-hook';
import { DraftInfoDialog } from '../DraftInfoDialog';
import { TagsInput } from './TagsInput';
import { useArticle } from '../../../hooks';
import { useAppDispatch } from '../../../hooks/store';
import { setArticleCategory } from '../../../redux';
import { Button, CoverWindow } from '../../../components';

import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
    mode: 'isNew' | 'isEditing' | 'isDraft';
    isLoadingDraft: boolean;
    isSuccessDraft: boolean;
    isErrorDraft: boolean;
    isDisabledDraft: boolean;
    onClickSave: () => void;
    onPressDraft: (data: object) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    onClickSave,
    mode,
    isLoadingDraft,
    isSuccessDraft,
    isErrorDraft,
    isDisabledDraft,
    onPressDraft,
}) => {
    const dispatch = useAppDispatch();
    const { mutableArticle } = useArticle();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const categoryName = mutableArticle?.category?.category_name;

    const isMobile = useMediaPredicate('(max-width: 551px)');
    const isMobileSmall = useMediaPredicate('(max-width: 397px)');

    return (
        <DialogTrigger isOpen={isOpen} mobileType="fullscreenTakeover">
            <Button
                onClick={() => setIsOpen(true)}
                disabled={!mutableArticle.title}
                variant="filled">
                Продолжить
            </Button>
            {(close) => (
                <Dialog minHeight="650px">
                    <Heading UNSAFE_style={{ fontSize: '20px' }} marginBottom="30px">
                        Последние штрихи
                    </Heading>
                    <Content>
                        <div className={styles.plateContent}>
                            <div>
                                <div className={styles.itemHeadline}>Обложка *</div>
                                <CoverWindow
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    mode={mode}
                                />
                            </div>
                            <Picker
                                isRequired
                                label="Категория статьи"
                                defaultSelectedKey={categoryName}
                                selectedKey={categoryName}
                                onSelectionChange={(selected) => {
                                    dispatch(setArticleCategory(selected));
                                }}>
                                <Item key="reviews">Обзор</Item>
                                <Item key="solutions">Прохождение</Item>
                                <Item key="mentions">Отзыв</Item>
                            </Picker>
                            <TagsInput />
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
                                <DraftInfoDialog
                                    isLoading={isLoadingDraft}
                                    isSuccess={isSuccessDraft}
                                    isError={isErrorDraft}
                                    isDisabled={isDisabledDraft}
                                    onPress={onPressDraft}
                                />

                                <Button
                                    disabled={!(categoryName && mutableArticle?.cover)}
                                    onClick={onClickSave}
                                    variant="filled">
                                    {mode === 'isEditing'
                                        ? isMobile
                                            ? 'Обновить'
                                            : 'Обновить статью'
                                        : 'Опубликовать'}
                                </Button>
                            </div>
                        </div>
                    </Content>
                </Dialog>
            )}
        </DialogTrigger>
    );
};
