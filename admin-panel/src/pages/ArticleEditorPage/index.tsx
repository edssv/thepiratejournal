import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createReactEditorJS } from 'react-editor-js';
import debounce from 'lodash.debounce';
import { useMediaPredicate } from 'react-media-hook';

import { Button, Overlay } from '../../components';
import { resetArticle, selectArticle, setTitle, useGetArticleQuery } from '../../redux';
import NotFoundPage from '../NotFound';
import { useDocTitle, useAppDispatch } from '../../hooks';
import { resizeTextareaHeight } from '../../helpers';
import { ConfirmDialog, SaveChangesButton, EDITOR_JS_TOOLS, i18n } from './components';

import styles from './ArticleEditorPage.module.scss';

const ArticleEditorPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const article = useSelector(selectArticle);

    const fromPage = location?.state?.from?.pathname;

    useDocTitle('Изменение статьи');

    const editorCore = useRef<any>(null);
    const articleContentRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [formStatus, setFormStatus] = useState<'unchanged' | 'modified' | 'saved'>('unchanged');

    const { data, isLoading, isError } = useGetArticleQuery(id ?? '', {
        refetchOnMountOrArgChange: true,
    });

    const [blocks, setBlocks] = useState<[]>(data?.article.blocks ?? []);

    const isMobile = useMediaPredicate('(max-width: 768px)');

    const ReactEditorJS = createReactEditorJS();

    useEffect(() => {
        if (data?.article.blocks) {
            setBlocks(data?.article.blocks);
        }
    }, [location, dispatch, data]);

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

    const autoSave = useCallback(
        debounce(async () => {
            const savedData = await handleSave();
            setBlocks(savedData);
        }, 150),
        []
    );

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

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
                    <SaveChangesButton blocks={blocks} setFormStatus={setFormStatus} />
                    <ConfirmDialog
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
                            placeholder={isMobile ? 'Дай мне имя' : 'Как корабль назовёшь так он и поплывёт'}
                            className={styles.writingHeader}
                            value={article?.title}
                            onChange={(e) => dispatch(setTitle(e.target.value))}
                            style={{ height: 42 }}
                        />
                    </div>
                    {blocks && (
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
                    )}
                </form>
            </div>
        </div>
    );
};

export default ArticleEditorPage;
