/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { setCover, useAddCoverMutation, useDeleteCoverMutation } from '../../../../redux';
import { useMediaPredicate } from 'react-media-hook';
import { useAppDispatch, useArticle } from '../../../../hooks';
import Delete from '@spectrum-icons/workflow/Delete';
import ImageAdd from '@spectrum-icons/workflow/ImageAdd';

import styles from './CoverWindow.module.scss';
import { Button } from '../../../../components';

type CoverWindowProps = {
    selectedFile: any;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    mode: 'isNew' | 'isEditing' | 'isDraft';
};

export const CoverWindow: React.FC<CoverWindowProps> = ({
    selectedFile,
    setSelectedFile,
    mode,
}) => {
    const dispatch = useAppDispatch();
    const { mutableArticle } = useArticle();

    const filePicker = useRef<HTMLInputElement>(null);

    const [isMounted, setIsMounted] = useState(mode === 'isEditing');

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

        addCover(formData);
    };

    useEffect(() => {
        if (isMounted) return;

        if (selectedFile) handleUpload();
    }, [selectedFile]);

    useEffect(() => {
        if (data) {
            dispatch(setCover(data.file.url));
        }
    }, [data, dispatch]);

    const handleChange = async (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDeleteCover = () => {
        setIsMounted(false);
        dispatch(setCover(null));
        setSelectedFile(undefined);
        deleteCover(data.file);
    };

    // media
    const isMobile = useMediaPredicate('(max-width: 768px)');

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {selectedFile || mutableArticle?.cover ? (
                    isLoading ? (
                        <div className="cdx-loader"></div>
                    ) : (
                        <div className={styles.coverContainer}>
                            <img
                                className={styles.coverImage}
                                src={mutableArticle?.cover}
                                alt="Обложка статьи"
                            />
                            {mutableArticle?.cover && (
                                <Button
                                    className={styles.closeBtn}
                                    icon
                                    onClick={handleDeleteCover}
                                    variant="filledTonal">
                                    <span className="material-symbols-outlined">delete</span>
                                </Button>
                            )}
                        </div>
                    )
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.uploader} onClick={handlePick}>
                            <div className={styles.placeholder__content}>
                                <div className={styles.placeholderPicture}>
                                    <span className="material-symbols-outlined">
                                        add_photo_alternate
                                    </span>
                                </div>
                                <div className={styles.headline}>Нажми, чтобы выбрать файл</div>
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
