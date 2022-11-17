import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import debounce from 'lodash.debounce';
import styles from './ArticleEditorPage.module.scss';
import Configuration from './configuration';
import { BtnLeftFixed, Avatar, CoverWindow, ButtonClose } from '../../components';
import { useAddArticleMutation, useEditArticleMutation, useGetArticleEditQuery } from '../../redux';
import { Button, DialogTrigger, AlertDialog, ProgressCircle } from '@adobe/react-spectrum';
import NotFoundPage from '../NotFoundPage';
import { useMatchMedia, useDocTitle, useAuth } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import Checkmark from '@spectrum-icons/workflow/Checkmark';
import ChevronLeft from '@spectrum-icons/workflow/ChevronLeft';
import { TopPanelMobile } from '../../components/TopPanelMobile';
import { resizeTextareaHeight } from './resizeTextareaFunction';

const ArticleEditorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);
    const auth = useAuth();

    // set doctitle
    const [doctitle, setDocTitle] = useDocTitle(!isEditing ? 'Новая статья' : 'Изменение статьи');
    // redux rtk
    const { data, isLoading, isSuccess, isError, error } = useGetArticleEditQuery(isEditing && id);
    const [addArticle] = useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();
    // location
    const fromPage = location?.state?.from?.pathname;
    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');

    const [selectedFile, setSelectedFile] = useState('');
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [editor, setEditor] = useState({});

    const saveDraft = useCallback(
        debounce((data) => {
            addArticle(data);
        }, 150),
        [],
    );

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

    if (isEditing && isError) {
        return <NotFoundPage />;
    }

    const onChangeEditor = () => {
        editor.save().then((outputData) => {
            const formData = Object.assign({ entry: outputData }, { autoSave: true });
            saveDraft(formData);
        });
    };

    const saveArticle = () => {
        editor
            .save()
            .then((outputData) => {
                delete outputData.version;
                const formData = Object.assign(
                    outputData,
                    { title: textareaValue },
                    { cover: uploadedUrl },
                );
                isEditing ? editArticle({ formData, id }) : addArticle(formData);
                console.log({ formData, id });
            })
            .catch((error) => {
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
            <Button isDisabled={selectedFile ? false : true} variant="cta">
                {isEditing ? 'Сохранить' : 'Опубликовать'}
            </Button>
            {(close) => (
                <AlertDialog
                    variant="confirmation"
                    title="Подтвердить"
                    primaryActionLabel="Опубликовать"
                    // secondaryActionLabel="Сохранить как черновик"
                    cancelLabel="Отмена"
                    onPrimaryAction={onClickSave}>
                    Вы уверены, что хотите опубликовать новую статью?
                </AlertDialog>
            )}
        </DialogTrigger>
    );

    return (
        <div className={styles.root}>
            <div className={styles.top_bar}>
                <Button onPress={() => navigate(fromPage ? fromPage : '/')} variant="secondary">
                    Отмена
                </Button>
                {Confirm}
            </div>
            <div className={styles.container}>
                <div className={styles.textarea__wrapper}>
                    <textarea
                        placeholder="Дай мне имя"
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
            </div>
        </div>
    );
};

export default ArticleEditorPage;
