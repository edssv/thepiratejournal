import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createReactEditorJS } from 'react-editor-js';
import { Button, Overlay } from '../../components';
import {
    resetMutableArticle,
    setBlocks,
    setTitle,
    useAddArticleMutation,
    useEditArticleMutation,
    useGetMutableArticleQuery,
} from '../../redux';
import { i18n, EDITOR_JS_TOOLS } from './EditorJs';
import debounce from 'lodash.debounce';
import NotFoundPage from '../NotFound';
import { useArticle, useDocTitle, useAppDispatch } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import { resizeTextareaHeight } from '../../helpers';
import { ConfirmDialog } from './ConfirmDialog/ConfirmDialog';
import { DraftInfoDialog } from './DraftInfoDialog';

import styles from './ArticleEditorPage.module.scss';

const ArticleEditorPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fromPage = location?.state?.from?.pathname;
    const { id } = useParams();

    const isDraft = Boolean(location.pathname.split('/')[1] === 'drafts');
    const isEditing = isDraft ? false : Boolean(id);
    const [mode, setMode] = useState<'isNew' | 'isEditing' | 'isDraft'>(
        isDraft ? 'isDraft' : isEditing ? 'isEditing' : 'isNew',
    );
    useDocTitle(mode === 'isNew' || 'isDraft' ? 'Новая статья' : 'Изменение статьи');
    const { mutableArticle } = useArticle();

    const editorCore = useRef<any>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [formStatus, setFormStatus] = useState<'unchanged' | 'modified' | 'saved'>('unchanged');

    const { data, isLoading, isError } = useGetMutableArticleQuery(id, {
        skip: mode === 'isNew',
        refetchOnMountOrArgChange: true,
    });
    const [addArticle, { isLoading: isSaving, isSuccess: isSuccessSave, isError: isErrorSave }] =
        useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();

    const isMobile = useMediaPredicate('(max-width: 768px)');

    const ReactEditorJS = createReactEditorJS();

    useEffect(() => {
        if (location.pathname.split('/')[2] === 'new') {
            setMode('isNew');
            dispatch(
                resetMutableArticle({
                    _id: '',
                    title: '',
                    cover: '',
                    blocks: [],
                    tags: [],
                    category: { category_name: '', game: '' },
                }),
            );

            if (textareaRef.current) {
                textareaRef.current.value = '';
            }
        }
    }, [mode, location, dispatch, data]);

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

    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current?.save();
        dispatch(setBlocks(savedData));
    }, [dispatch]);

    const autoSave = useCallback(
        debounce(() => {
            handleSave();
        }, 150),
        [],
    );

    if (isLoading) return <Overlay />;
    if (isError && mode === 'isEditing') return <NotFoundPage />;

    const saveArticle = async () => {
        const formData = Object.assign(
            { saveFromDraft: isDraft, draftId: isDraft && id },
            { intent: 'publish' },
            mutableArticle,
        );
        mode === 'isEditing' ? editArticle({ formData, id }) : addArticle(formData);
    };

    const saveDraft = async () => {
        const formData = Object.assign({ intent: 'draft' }, mutableArticle);
        addArticle(formData);
        setFormStatus('saved');
    };

    const onClickSave = () => {
        saveArticle();
        navigate(-1);
    };

    resizeTextareaHeight();

    return (
        <div className={styles.root}>
            <div className={styles.top_bar}>
                <Button
                    onClick={() =>
                        navigate(fromPage && fromPage !== location.pathname ? fromPage : '/')
                    }
                    variant="outlined">
                    Отмена
                </Button>
                <div className={styles.barRightButtons}>
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
                        onClickSave={onClickSave}
                        mode={mode}
                        onPressDraft={saveDraft}
                        isLoadingDraft={isSaving}
                        isSuccessDraft={isSuccessSave}
                        isErrorDraft={isErrorSave}
                        isDisabledDraft={isSaving}
                    />
                </div>
            </div>
            <div className={styles.container}>
                <form
                    onChange={(e) => {
                        if (mutableArticle?.title !== '') {
                            setFormStatus('modified');
                        } else {
                            setFormStatus('unchanged');
                        }
                    }}>
                    <div className={styles.textarea__wrapper}>
                        <textarea
                            ref={textareaRef}
                            maxLength={68}
                            autoFocus={true}
                            placeholder={
                                isMobile ? 'Дай мне имя' : 'Как корабль назовёшь так он и поплывёт'
                            }
                            className={styles.writingHeader}
                            value={mutableArticle?.title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            style={{ height: 42 }}
                        />
                    </div>
                    {(isEditing || isDraft) && mutableArticle?.blocks ? (
                        <ReactEditorJS
                            onInitialize={handleInitialize}
                            placeholder="Давай напишем классную статью!"
                            defaultValue={{
                                blocks: mutableArticle?.blocks,
                            }}
                            tools={EDITOR_JS_TOOLS}
                            i18n={i18n}
                            onChange={autoSave}
                        />
                    ) : (
                        mode === 'isNew' && (
                            <ReactEditorJS
                                onInitialize={handleInitialize}
                                placeholder="Давай напишем классную статью!"
                                tools={EDITOR_JS_TOOLS}
                                i18n={i18n}
                                onChange={autoSave}
                            />
                        )
                    )}
                </form>
            </div>
        </div>
    );
};

export default ArticleEditorPage;
