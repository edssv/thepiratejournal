import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createReactEditorJS } from 'react-editor-js';
import debounce from 'lodash.debounce';
import { useMediaPredicate } from 'react-media-hook';

import { Button, Overlay } from '../../components';
import { resetArticle, selectArticle, setTitle, useAddArticleMutation, useGetArticleQuery } from '../../redux';
import NotFoundPage from '../NotFound';
import { useDocTitle, useAppDispatch } from '../../hooks';
import { resizeTextareaHeight } from '../../helpers';
import { ConfirmDialog, DraftInfoDialog, EDITOR_JS_TOOLS, i18n } from './components';

import styles from './ArticleEditorPage.module.scss';

const ArticleEditorPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isDraft = location.pathname.split('/')[1] === 'drafts';
    const isEditing = !isDraft && Boolean(id);
    const [mode, setMode] = useState<'isNew' | 'isEditing' | 'isDraft'>(
        isDraft ? 'isDraft' : isEditing ? 'isEditing' : 'isNew'
    );
    useDocTitle(mode === 'isNew' || 'isDraft' ? 'Новая статья' : 'Изменение статьи');
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetArticleQuery(id ?? '', {
        skip: mode === 'isNew',
        refetchOnMountOrArgChange: true,
    });
    const [saveArticle, { data: saveArticleResponse }] = useAddArticleMutation();
    const article = useSelector(selectArticle);
    const fromPage = location?.state?.from?.pathname;
    const editorCore = useRef<any>(null);
    const articleContentRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [formStatus, setFormStatus] = useState<'unchanged' | 'modified' | 'saved'>('unchanged');
    const [blocks, setBlocks] = useState(article?.blocks);

    const ReactEditorJS = createReactEditorJS();

    useEffect(() => {
        if (location.pathname.split('/')[2] === 'new') {
            setMode('isNew');
            dispatch(
                resetArticle({
                    _id: '',
                    title: '',
                    cover: '',
                    blocks: [],
                    tags: [],
                })
            );

            if (textareaRef.current) {
                textareaRef.current.value = '';
            }
        }

        if (data?.blocks) {
            setBlocks(data?.blocks);
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

        return;
    }, [formStatus]);

    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current?.save();
        return savedData;
    }, []);

    const autoSave = debounce(async () => {
        const savedData = await handleSave();

        setBlocks(savedData);

        // const formData = Object.assign({ intent: 'draft' }, article, blocks);
        // saveArticle(formData);
    }, 150);

    if (isLoading) return <Overlay />;
    if (isError && mode === 'isEditing') return <NotFoundPage />;

    resizeTextareaHeight();

    return (
        <div className={styles.root}>
            <div className={styles.top_bar}>
                <Button
                    onClick={() => navigate(fromPage && fromPage !== location.pathname ? fromPage : '/')}
                    variant="outlined"
                >
                    Отмена
                </Button>
                <div className={styles.barRightButtons}>
                    {!isEditing && <DraftInfoDialog setFormStatus={setFormStatus} blocks={blocks} />}
                    <ConfirmDialog
                        mode={mode}
                        setFormStatus={setFormStatus}
                        articleContentRef={articleContentRef}
                        blocks={blocks}
                    />
                </div>
            </div>
            <div ref={articleContentRef} className={styles.container}>
                <form
                    onChange={() => {
                        if (article?.title) {
                            setFormStatus('modified');
                        } else {
                            setFormStatus('unchanged');
                        }
                    }}
                >
                    <div className={styles.textarea__wrapper}>
                        <textarea
                            ref={textareaRef}
                            maxLength={68}
                            autoFocus={true}
                            placeholder="Дай мне имя"
                            className={styles.writingHeader}
                            value={article?.title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            style={{ height: 42 }}
                        />
                    </div>
                    {(isEditing || isDraft) && blocks ? (
                        <ReactEditorJS
                            onInitialize={handleInitialize}
                            placeholder="Давай напишем классную статью!"
                            defaultValue={{
                                blocks: blocks,
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
