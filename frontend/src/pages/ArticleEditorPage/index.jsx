import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import debounce from 'lodash.debounce';
import { ButtonClose } from '../../components/Buttons/ButtonClose';
import styles from './ArticleEditorPage.module.scss';
import Configuration from './configuration';
import { BtnLeftFixed } from '../../components/Buttons/BtnLeftFixed';
import { useAddArticleMutation, useEditArticleMutation, useGetArticleEditQuery } from '../../redux';
import { CoverWindow } from '../../components/CoverWindow';
import { Button, DialogTrigger, AlertDialog, ProgressCircle } from '@adobe/react-spectrum';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../../components/Avatar';
import NotFoundPage from '../NotFoundPage';

const ArticleEditorPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const textAreaRef = useRef();

    const isEditing = Boolean(id);

    const fromPage = location?.state?.from?.pathname;

    const { data, isLoading, isSuccess, isError, error } = useGetArticleEditQuery(isEditing && id);
    const [addArticle] = useAddArticleMutation();
    const [editArticle] = useEditArticleMutation();

    const auth = useAuth();

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
                    top="45%"
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

    const avatar = auth.user ? auth.user.avatar : '';
    const userName = auth.user ? auth.user.userName : '';

    const tx = textAreaRef;
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;');
        tx[i].addEventListener('input', OnInput, false);
    }

    function OnInput() {
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
    }

    return (
        <div className={styles.root}>
            {fromPage && <BtnLeftFixed />}
            <ButtonClose />
            <div className="container-720">
                <div className={styles.top}>
                    <div className={styles.top__author}>
                        <Link to="/profile">
                            <Avatar imageSrc={avatar} width={46} />
                        </Link>
                        <div className={styles.author__text}>
                            <div className={styles.headline}>{userName}</div>
                            <span className={`${styles.subhead} tp-text`}>Новая статья</span>
                        </div>
                    </div>
                    <div className={styles.top__right}>
                        <CoverWindow
                            uploadedUrl={uploadedUrl}
                            setUploadedUrl={setUploadedUrl}
                            onClickSave={onClickSave}
                            selectedFile={selectedFile}
                            setSelectedFile={setSelectedFile}
                            isEditing={isEditing}
                        />
                        <DialogTrigger>
                            <Button isDisabled={selectedFile ? false : true} variant="cta">
                                {isEditing ? 'Сохранить' : 'Публикация'}
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
                    </div>
                </div>
                <form>
                    <textarea
                        ref={textAreaRef}
                        placeholder="Заголовок"
                        className={styles.writingHeader}
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                    />
                    <div id="editorjs" />
                </form>
            </div>
        </div>
    );
};

export default ArticleEditorPage;
