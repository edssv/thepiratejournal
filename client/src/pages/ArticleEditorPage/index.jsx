import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';

import { ButtonClose } from '../../components/Buttons/ButtonClose';

import styles from './ArticleEditorPage.module.scss';
import Configuration from './configuration';
import { BtnLeftFixed } from '../../components/Buttons/BtnLeftFixed';
import { useAddArticleMutation } from '../../redux';
import { CoverWindow } from '../../components/CoverWindow';
import { Button, DialogTrigger, AlertDialog } from '@adobe/react-spectrum';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../../components/Avatar';

const ArticleEditorPage = () => {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState('');
    const [uploadedUrl, setUploadedUrl] = useState('');

    const [editor, seteditor] = useState({});

    useEffect(() => {
        const editor = new EditorJS(Configuration());
        seteditor(editor);
    }, []);

    const [addArticle] = useAddArticleMutation();

    const saveArticle = () => {
        editor
            .save()
            .then((outputData) => {
                delete outputData.version;
                const formData = Object.assign(outputData, { cover: uploadedUrl });
                addArticle(formData);
                console.log('Article data: ', outputData);
            })
            .catch((error) => {
                console.log('Saving failed: ', error);
            });
    };

    const onClickSave = () => {
        saveArticle();
        navigate(-1);
    };

    const auth = useAuth();
    const avatar = auth.user ? auth.user.avatar : '';
    const userName = auth.user ? auth.user.userName : '';
    return (
        <div className={styles.root}>
            <BtnLeftFixed />
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
                        />
                        <DialogTrigger>
                            <Button isDisabled={selectedFile ? false : true} variant="cta">
                                Публикация
                            </Button>
                            {(close) => (
                                <AlertDialog
                                    width="auto"
                                    maxWidth={1200}
                                    variant="confirmation"
                                    title="Подтвердить публикацию"
                                    primaryActionLabel="Опубликовать"
                                    secondaryActionLabel="Сохранить как черновик"
                                    cancelLabel="Отмена"
                                    onPrimaryAction={onClickSave}>
                                    Вы уверены, что хотите опубликовать новую статью?
                                </AlertDialog>
                            )}
                        </DialogTrigger>
                    </div>
                </div>
                <div id="editorjs" />
            </div>
        </div>
    );
};

export default ArticleEditorPage;
