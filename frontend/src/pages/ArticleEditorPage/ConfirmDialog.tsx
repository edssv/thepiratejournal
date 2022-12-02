import React from 'react';
import { useAsyncList } from 'react-stately';
import {
    AlertDialog,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    Item,
    Picker,
    Text,
} from '@adobe/react-spectrum';

import { DraftInfoDialog } from './DraftInfoDialog';

interface ConfirmDialogProps {
    isDisabled: boolean;
    onClickSave: any;
    isEditing?: boolean;
    articleCategory: React.Key | undefined;
    setArticleCategory: React.Dispatch<React.SetStateAction<React.Key | undefined>>;
    // draftInfoDialog
    isLoadingDraft: boolean;
    isSuccessDraft: boolean;
    isErrorDraft: boolean;
    isDisabledDraft: boolean;
    onPressDraft: (data: object) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isDisabled,
    onClickSave,
    isEditing,
    articleCategory,
    setArticleCategory,
    //draftInfoDialog
    isLoadingDraft,
    isSuccessDraft,
    isErrorDraft,
    isDisabledDraft,
    onPressDraft,
}) => {
    let list = useAsyncList({
        async load({ signal, cursor, filterText }) {
            if (cursor) {
                cursor = cursor.replace(/^http:\/\//i, 'https://');
            }

            let res = await fetch(
                cursor || `https://swapi.py4e.com/api/people/?search=${filterText}`,
                { signal },
            );
            let json = await res.json();

            return {
                items: json.results,
                cursor: json.next,
            };
        },
    });

    return (
        <DialogTrigger>
            <Button isDisabled={isDisabled} variant="cta">
                {isEditing ? 'Обновить статью' : 'Продолжить'}
            </Button>
            {(close) =>
                isEditing ? (
                    <AlertDialog
                        variant="confirmation"
                        title="Обновление статьи"
                        primaryActionLabel="Обновить"
                        cancelLabel="Отмена"
                        onPrimaryAction={onClickSave}>
                        <Text>Ты действительно хочешь обновить статью?</Text>
                    </AlertDialog>
                ) : (
                    <Dialog>
                        <Heading UNSAFE_style={{ fontSize: '24px' }}>Последние штрихи</Heading>
                        <Divider marginBottom="30px" />
                        <Content>
                            <Picker
                                isRequired
                                label="Категория статьи"
                                description="Категория, соответствующая твоей статье"
                                selectedKey={articleCategory}
                                onSelectionChange={(selected) => setArticleCategory(selected)}>
                                <Item key="reviews">Обзор</Item>
                                <Item key="solutions">Прохождение</Item>
                                <Item key="mentions">Отзыв</Item>
                            </Picker>
                        </Content>
                        <ButtonGroup>
                            <Button onPress={close} variant="secondary">
                                Отмена
                            </Button>
                            <DraftInfoDialog
                                isLoading={isLoadingDraft}
                                isSuccess={isSuccessDraft}
                                isError={isErrorDraft}
                                isDisabled={isDisabledDraft}
                                onPress={onPressDraft}
                            />
                            <Button
                                isDisabled={!articleCategory}
                                onPress={onClickSave}
                                variant="accent">
                                Опубликовать
                            </Button>
                        </ButtonGroup>
                    </Dialog>
                )
            }
        </DialogTrigger>
    );
};
