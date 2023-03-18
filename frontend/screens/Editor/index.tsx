import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Overlay } from '../../components';
import {
    editorDataSelector,
    modeSelector,
    resetData,
    setMode,
    useGetArticleQuery,
    useGetDraftQuery,
} from '../../redux';
import NotFoundPage from '../NotFound';
import { useDocTitle, useAppDispatch, useAuth } from '../../hooks';
import { resizeTextareaHeight } from '../../../helpers';
import { ConfirmDialog, DraftInfoDialog, Form } from './components';

import styles from './Editor.module.scss';

const Editor = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const data = useSelector(editorDataSelector);
    const mode = useSelector(modeSelector);
    const { user } = useAuth();
    const articleContentRef = useRef<HTMLDivElement>(null);
    const { setDocTitle } = useDocTitle('');
    const { isLoading, isError } = useGetArticleQuery(id ?? '', {
        skip: mode !== 'editing',
        refetchOnMountOrArgChange: true,
    });
    const { isLoading: isLoadingDraft, isError: isErrorDraft } = useGetDraftQuery(id ?? '', {
        skip: mode !== 'draft',
        refetchOnMountOrArgChange: true,
    });
    const fromPage = location?.state?.from?.pathname;
    const [blocks, setBlocks] = useState(data?.blocks ?? []);

    useEffect(() => {
        if (mode === 'editing' || mode === 'draft') {
            if (data.author && user?.id !== data.author._id) {
                navigate(-1);
            }
        }
    }, [mode, data]);

    useEffect(() => {
        const isNew = location.pathname.split('/')[2] === 'new';
        const isDraft = location.pathname.split('/')[1] === 'drafts';
        const isEditing = !isDraft && location.pathname.split('/')[3] === 'edit';

        if (isNew) {
            dispatch(setMode('new'));
        }

        if (isDraft) {
            dispatch(setMode('draft'));
        }

        if (isEditing) {
            dispatch(setMode('editing'));
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

    if (isLoading || isLoadingDraft) return null;
    if ((isError && mode === 'editing') || isErrorDraft) return <NotFoundPage />;

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
                    {mode !== 'editing' && <DraftInfoDialog blocks={blocks} />}
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
