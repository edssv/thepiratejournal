import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../../components';
import {
    articleTypeSelector,
    editorDataSelector,
    modeSelector,
    resetData,
    setArticleType,
    setMode,
    useGetArticleQuery,
} from '../../redux';
import NotFoundPage from '../NotFound';
import { useAppDispatch, useDocTitle } from '../../hooks';
import { resizeTextareaHeight } from '../../helpers';
import { ConfirmDialog, SaveChanges, Form } from './components';

import styles from './Editor.module.scss';

const Editor: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const data = useSelector(editorDataSelector);
    const mode = useSelector(modeSelector);
    const articleType = useSelector(articleTypeSelector);
    const { setDocTitle } = useDocTitle('');
    const articleContentRef = useRef<HTMLDivElement>(null);
    const isBlog = location.pathname.split('/')[1] === 'blog';
    const { isLoading, isError } = useGetArticleQuery(
        { id: id ?? '', type: isBlog ? 'blog' : 'articles' },
        {
            skip: mode !== 'editing',
            refetchOnMountOrArgChange: true,
        }
    );
    const fromPage = location?.state?.from?.pathname;
    const [blocks, setBlocks] = useState(data?.blocks ?? []);

    useEffect(() => {
        const isNew = location.pathname.split('/')[2] === 'new';
        const isEditing = location.pathname.split('/')[3] === 'edit';

        if (isNew) {
            dispatch(setMode('new'));
        }

        if (isEditing) {
            dispatch(setMode('editing'));
        }

        if (isBlog) {
            dispatch(setArticleType('blog'));
        }

        if (!isBlog) {
            dispatch(setArticleType('article'));
        }

        setDocTitle(mode === 'new' || mode === 'draft' ? 'Новая статья' : 'Изменение статьи');
    }, [mode, location]);

    useEffect(() => {
        return () => {
            dispatch(resetData());
            dispatch(setMode(null));
            setBlocks([]);
        };
    }, []);

    if (isLoading) return null;
    if (isError && mode === 'editing') return <NotFoundPage />;

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
                    {mode !== 'editing' && <SaveChanges blocks={blocks} />}
                    <ConfirmDialog articleContentRef={articleContentRef} blocks={blocks} />
                </div>
            </div>
            <div ref={articleContentRef} className={styles.container}>
                <Form setBlocks={setBlocks} />
            </div>
        </div>
    );
};

export default Editor;
