/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import CoverImage from '@spectrum-icons/workflow/CoverImage';
import ImageAdd from '@spectrum-icons/workflow/ImageAdd';
import { useAddCoverMutation, useDeleteCoverMutation } from '../../redux';
import {
    Button,
    Dialog,
    DialogTrigger,
    Heading,
    Divider,
    Content,
    ButtonGroup,
    IllustratedMessage,
    Text,
    View,
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';

import styles from './CoverWindow.module.scss';
import { useMediaPredicate } from 'react-media-hook';
import Delete from '@spectrum-icons/workflow/Delete';

type CoverWindowProps = {
    windowOpen?: boolean;
    uploadedUrl: string;
    setUploadedUrl: any;
    onClickSave: any;
    selectedFile: any;
    setSelectedFile: any;
    isEditing: boolean;
};

export const CoverWindow: React.FC<CoverWindowProps> = ({
    uploadedUrl,
    setUploadedUrl,
    onClickSave,
    selectedFile,
    setSelectedFile,
    isEditing,
}) => {
    const filePicker = useRef<HTMLInputElement>(null);

    const [isMounted, setIsMounted] = useState(isEditing);
    const [addCover, { data, isLoading }] = useAddCoverMutation();
    const [deleteCover] = useDeleteCoverMutation();

    console.log(uploadedUrl);

    const handlePick = () => {
        filePicker.current?.click();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Пожалуйста выберите изображение');
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        addCover(formData);
    };

    useEffect(() => {
        if (isMounted) return;

        if (selectedFile) handleUpload();
    }, [selectedFile]);

    useEffect(() => {
        if (data) setUploadedUrl(data.file.url);
    }, [data]);

    const handleChange = async (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDeleteCover = () => {
        if (selectedFile) {
            setIsMounted(false);
            setUploadedUrl('');
            setSelectedFile('');
            deleteCover(data.file);
        }
    };

    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {selectedFile ? (
                    isLoading ? (
                        <div className="cdx-loader"></div>
                    ) : (
                        <div
                            className={styles.cover}
                            style={{ backgroundImage: `url(${uploadedUrl})` }}>
                            {uploadedUrl && (
                                <div className={`${styles.cover__closeBtn} icon-center`}>
                                    <Button
                                        onPress={handleDeleteCover}
                                        variant="cta"
                                        staticColor="black"
                                        height="38px"
                                        width="38px">
                                        <Delete />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.uploader} onClick={handlePick}>
                            <div className={styles.placeholder__content}>
                                {!isMobile && (
                                    <ImageAdd color="informative" size="XXL" marginBottom={12} />
                                )}
                                <div className={styles.headline}>Нажмите, чтобы выбрать файл</div>
                                <p>Рекомендуется 1600x1200 или выше. Максимум 8МБ</p>
                                <ul>
                                    <li>Изображения высокого разрешения (png, jpg, webp)</li>
                                    <li>
                                        Загружайте только те медиафайлы, на которые у вас есть права
                                    </li>
                                </ul>
                            </div>
                            <input
                                ref={filePicker}
                                className="hidden"
                                type="file"
                                onChange={handleChange}
                                accept="image/jpeg,image/png,image/webp"
                                name="photo"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    <DialogTrigger>
        {!isMobile ? (
            <Button variant="primary">
                <CoverImage />
                <Text>Обложка</Text>
            </Button>
        ) : (
            <Button isQuiet variant="primary">
                <ImageAdd />
            </Button>
        )}
        {(close) => (
            <Dialog>
                <Heading>Выбор обложки</Heading>
                <Divider />
                <Content maxWidth={568} height={308} width="100%">
                    {!selectedFile ? (
                        <IllustratedMessage height={300}>
                            <button onClick={handlePick}>
                                <Upload />
                                {isMobile ? (
                                    <h4>Нажмите, чтобы выбрать файл</h4>
                                ) : (
                                    <Heading>Нажмите, чтобы выбрать файл</Heading>
                                )}
                                <input
                                    ref={filePicker}
                                    className="hidden"
                                    type="file"
                                    onChange={handleChange}
                                    accept="image/jpeg,image/png,image/webp"
                                    name="photo"
                                />
                                <Content>
                                    Формат — JPG, WEBP, или PNG <br />
                                </Content>
                            </button>
                        </IllustratedMessage>
                    ) : isLoading ? (
                        <div className="cdx-loader"></div>
                    ) : (
                        <div
                            className={styles.cover}
                            style={{ backgroundImage: `url(${uploadedUrl})` }}>
                            {uploadedUrl && (
                                <button
                                    onClick={handleDeleteCover}
                                    className={`${styles.cover__closeBtn} icon-center`}>
                                    <IoClose size={14} color="white" />
                                </button>
                            )}
                        </div>
                    )}
                </Content>
                <ButtonGroup>
                    <Button
                        variant="secondary"
                        onPress={() => {
                            close();
                        }}>
                        Отмена
                    </Button>
                    <Button
                        onPress={() => close()}
                        isDisabled={selectedFile ? false : true}
                        variant="cta"
                        autoFocus>
                        Подтвердить
                    </Button>
                </ButtonGroup>
            </Dialog>
        )}
    </DialogTrigger>;
};
