import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import debounce from 'lodash.debounce';
import styles from './ArticleEditorPage.module.scss';
import Configuration from './configuration';
import { CoverWindow } from '../../components';
import { useAddArticleMutation, useEditArticleMutation, useGetArticleQuery } from '../../redux';
import {
    Button,
    DialogTrigger,
    AlertDialog,
    ProgressCircle,
    TooltipTrigger,
    Tooltip,
    ButtonGroup,
} from '@adobe/react-spectrum';
import NotFoundPage from '../NotFoundPage';
import { useDocTitle, useAuth } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import { resizeTextareaHeight } from './resizeTextareaFunction';

interface IEditorJS {
    save: any;
}

const ArticleEditorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const auth = useAuth();

    // set doctitle
    const [doctitle, setDocTitle] = useDocTitle(!isEditing ? 'Новая статья' : 'Изменение статьи');
    // redux rtk
    const { data, isLoading, isSuccess, isError, error } = useGetArticleQuery(id, {
        skip: !isEditing && true,
    });
    const [addArticle, { isLoading: isSaving }] = useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();
    // location
    const fromPage = location?.state?.from?.pathname;
    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');

    const [selectedFile, setSelectedFile] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [formStatus, setFormStatus] = useState<'unchanged' | 'modified' | 'saved'>('unchanged');

    const [editor, setEditor] = useState<IEditorJS>();

    // const saveDraft = useCallback(
    //     debounce((data) => {
    //         console.log(data);
    //     }, 150),
    //     [],
    // );

    useEffect(() => {
        if (isEditing) {
            if (isLoading) {
                <ProgressCircle
                    position="absolute"
                    isIndeterminate
                    size="M"
                    left="50%"
                    top="50%"
                    aria-label="Загрузка..."
                />;
            }
            if (isSuccess) {
                setTextareaValue(data?.article.title);
                const editorjs = new EditorJS(Configuration(data.article.blocks));
                setSelectedFile(true);
                setUploadedUrl(data.article.cover);
                setEditor(editorjs);
            }
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

    if (isEditing && isError) {
        return <NotFoundPage />;
    }

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
                delete outputData.version;
                const formData = Object.assign(
                    { intent: 'publish' },
                    outputData,
                    { title: textareaValue },
                    { cover: uploadedUrl },
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
                delete outputData.version;
                const formData = Object.assign(
                    { intent: 'draft' },
                    outputData,
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

    const Confirm = (
        <DialogTrigger>
            <Button isDisabled={selectedFile && textareaValue ? false : true} variant="cta">
                {isEditing ? 'Обновить' : 'Опубликовать'}
            </Button>
            {(close) => (
                <AlertDialog
                    variant="confirmation"
                    title={isEditing ? 'Обновление статьи' : 'Публикация статьи'}
                    primaryActionLabel={isEditing ? 'Обновить' : 'Опубликовать'}
                    // secondaryActionLabel="Сохранить как черновик"
                    cancelLabel="Отмена"
                    onPrimaryAction={onClickSave}>
                    {isEditing
                        ? 'Ты действительно хочешь обновить статью?'
                        : 'Ты децствительно хочешь опубликовать новую статью,'}
                </AlertDialog>
            )}
        </DialogTrigger>
    );

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
                <ButtonGroup>
                    {!isEditing && (
                        <Button onPress={saveDraft} isDisabled={isSaving && true} variant="primary">
                            {isSaving && (
                                <ProgressCircle
                                    size="S"
                                    marginEnd="8px"
                                    isIndeterminate
                                    aria-label="Loading…"
                                />
                            )}{' '}
                            Сохранить как черновик
                        </Button>
                    )}
                    {Confirm}
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
                            autoFocus={true}
                            placeholder="Как корабль назовёшь так он и поплывёт"
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
                    <div id="editorjs" />
                </form>
            </div>
        </div>
    );
};

export default ArticleEditorPage;
