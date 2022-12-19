/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useAddCoverMutation, useDeleteCoverMutation } from '../../../redux';
import { Button } from '@adobe/react-spectrum';
import { useMediaPredicate } from 'react-media-hook';
import Delete from '@spectrum-icons/workflow/Delete';
import ImageAdd from '@spectrum-icons/workflow/ImageAdd';

import styles from './CoverWindow.module.scss';

type CoverWindowProps = {
    windowOpen?: boolean;
    uploadedUrl?: string;
    setUploadedUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    onClickSave: () => void;
    selectedFile: any;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
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

    const handlePick = () => {
        filePicker.current?.click();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Пожалуйста выберите изображение');
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log(selectedFile);

        addCover(formData);
    };

    useEffect(() => {
        if (isMounted) return;

        if (selectedFile) handleUpload();
    }, [selectedFile]);

    useEffect(() => {
        if (data) setUploadedUrl(data.file.url);
    }, [data, setUploadedUrl]);

    const handleChange = async (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDeleteCover = () => {
        setIsMounted(false);
        setUploadedUrl(undefined);
        setSelectedFile(undefined);
        deleteCover(data.file);
    };

    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {selectedFile || uploadedUrl ? (
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
                                <div className={styles.headline}>Нажми, чтобы выбрать файл</div>
                                <p>Рекомендуется 1600x1200 или выше. Максимум 8МБ</p>
                                <ul>
                                    <li>Изображения высокого разрешения (png, jpg, webp)</li>
                                    <li>
                                        Загружай только те медиафайлы, на которые у тебя есть права
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
};
