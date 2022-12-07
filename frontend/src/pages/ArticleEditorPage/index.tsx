import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import Configuration from './configuration';
import { CoverWindow, Overlay } from '../../components';
import { useAddArticleMutation, useEditArticleMutation, useGetArticleQuery } from '../../redux';
import { Button, TooltipTrigger, Tooltip, ButtonGroup } from '@adobe/react-spectrum';
import NotFoundPage from '../NotFound';
import { useDocTitle } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import { resizeTextareaHeight } from './resizeTextareaFunction';

import styles from './ArticleEditorPage.module.scss';
import { ConfirmDialog } from './ConfirmDialog';
import { DraftInfoDialog } from './DraftInfoDialog';

interface IEditorJS {
    save: any;
    onChange?: any;
}

const ArticleEditorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fromPage = location?.state?.from?.pathname;
    const { id } = useParams();
    const isDraft = Boolean(location.pathname.split('/')[1] === 'drafts');
    const isEditing = isDraft ? false : Boolean(id);

    useDocTitle(!isEditing ? 'Новая статья' : 'Изменение статьи');

    const { data, isLoading, isError } = useGetArticleQuery(id, {
        skip: !isEditing && !isDraft,
    });
    const [addArticle, { isLoading: isSaving, isSuccess: isSuccessSave, isError: isErrorSave }] =
        useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();

    const isMobile = useMediaPredicate('(max-width: 768px)');

    const [selectedFile, setSelectedFile] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | undefined>();
    const [textareaValue, setTextareaValue] = useState<string | undefined>();
    const [blocks, setBlocks] = useState();
    const [formStatus, setFormStatus] = useState<'unchanged' | 'modified' | 'saved'>('unchanged');
    const [articleCategory, setArticleCategory] = useState<React.Key>();

    const ReactEditorJS = createReactEditorJS();
    const [editor, setEditor] = useState<IEditorJS>();

    // const saveDraft = useCallback(
    //     debounce((data) => {
    //         console.log(data);
    //     }, 150),
    //     [],
    // );

    useEffect(() => {
        if (isEditing || isDraft) {
            const editorjs = new EditorJS(Configuration(data?.blocks));
            setTextareaValue(data?.title);
            setSelectedFile(data?.cover ? true : false);
            setUploadedUrl(data?.cover);
            setEditor(editorjs);
            setBlocks(data?.blocks);
        } else {
            const editorjs = new EditorJS(Configuration());
            setEditor(editorjs);
        }
    }, [data]);

    useEffect(() => {
        const handler = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };

        if (formStatus === 'modified') {
            window.addEventListener('beforeunload', handler);

            return () => {
                window.removeEventListener('beforeunload', handler);
            };
        }

        return () => {};
    }, [formStatus]);

    if (isLoading) return <Overlay />;
    if (isEditing && isError) return <NotFoundPage />;

    const onChangeEditor = () => {
        editor?.save().then((outputData: object) => {
            const formData = Object.assign(
                { entry: outputData, textareaValue },
                { autoSave: true },
            );
            saveDraft(formData);
        });
    };

    const saveArticle = () => {
        editor
            ?.save()
            .then((outputData: any) => {
                const formData = Object.assign(
                    outputData,
                    { saveFromDraft: isDraft, draftId: isDraft && id },
                    { intent: 'publish' },
                    { title: textareaValue },
                    { cover: uploadedUrl },
                    { category: { categoryName: articleCategory, game: 'Warface' } },
                );
                isEditing ? editArticle({ formData, id }) : addArticle(formData);
            })
            .catch((error: ErrorCallback) => {
                console.log('Saving failed: ', error);
            });
    };

    const saveDraft = (data: object) => {
        editor
            ?.save()
            .then((outputData: any) => {
                const formData = Object.assign(
                    outputData,
                    { intent: 'draft' },
                    { title: textareaValue },
                    { cover: uploadedUrl },
                );
                addArticle(formData);
                setFormStatus('saved');
            })
            .catch((error: ErrorCallback) => {
                console.log('Saving failed: ', error);
            });
    };

    const onClickSave = () => {
        saveArticle();
        navigate(-1);
    };

    resizeTextareaHeight();

    return (
        <div className={styles.root}>
            <div className={styles.top_bar}>
                <TooltipTrigger delay={200}>
                    <Button
                        onPress={() =>
                            navigate(fromPage && fromPage !== location.pathname ? fromPage : '/')
                        }
                        variant="secondary">
                        Отмена
                    </Button>
                    <Tooltip placement="right">Вернуться назад</Tooltip>
                </TooltipTrigger>
                <ButtonGroup align="end">
                    {!isEditing && (
                        <DraftInfoDialog
                            onPress={saveDraft}
                            isLoading={isSaving}
                            isSuccess={isSuccessSave}
                            isError={isErrorSave}
                            isDisabled={isSaving}
                        />
                    )}
                    <ConfirmDialog
                        isDisabled={selectedFile && textareaValue ? false : true}
                        onClickSave={onClickSave}
                        isEditing={isEditing}
                        articleCategory={articleCategory}
                        setArticleCategory={setArticleCategory}
                        onPressDraft={saveDraft}
                        isLoadingDraft={isSaving}
                        isSuccessDraft={isSuccessSave}
                        isErrorDraft={isErrorSave}
                        isDisabledDraft={isSaving}
                    />
                </ButtonGroup>
            </div>
            <div className={styles.container}>
                <form
                    onChange={(e) => {
                        if (textareaValue !== '') {
                            setFormStatus('modified');
                        } else {
                            setFormStatus('unchanged');
                        }
                    }}>
                    <div className={styles.textarea__wrapper}>
                        <textarea
                            maxLength={68}
                            autoFocus={true}
                            placeholder={
                                isMobile ? 'Дай мне имя' : 'Как корабль назовёшь так он и поплывёт'
                            }
                            className={styles.writingHeader}
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                            style={{ height: 42 }}
                        />
                    </div>
                    <CoverWindow
                        uploadedUrl={uploadedUrl}
                        setUploadedUrl={setUploadedUrl}
                        onClickSave={onClickSave}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        isEditing={isEditing}
                    />
                    <div id="editorjs" onChange={() => console.log('p')} />
                    {/* <ReactEditorJS onChange={() => console.log('p')} defaultValue={blocks} /> */}
                </form>
            </div>
        </div>
    );
};

export default ArticleEditorPage;
