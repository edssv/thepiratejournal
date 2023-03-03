import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    editorDataSelector,
    modeSelector,
    setCover,
    useAddCoverMutation,
    useDeleteCoverMutation,
} from '../../../../../../redux';
import { useAppDispatch } from '../../../../../../hooks';
import { Button } from '../../../../../../components';

import styles from './CoverWindow.module.scss';

type CoverWindowProps = {
    selectedFile: any;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

export const CoverWindow: React.FC<CoverWindowProps> = ({ selectedFile, setSelectedFile }) => {
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);
    const mode = useSelector(modeSelector);
    const filePicker = useRef<HTMLInputElement>(null);
    const [isMounted, setIsMounted] = useState(mode === 'editing');
    const [addCover, { data: coverData, isLoading }] = useAddCoverMutation();
    const [deleteCover] = useDeleteCoverMutation();

    const handlePick = () => {
        filePicker.current?.click();
    };

    const handleUpload = useCallback(async () => {
        if (!selectedFile) {
            alert('Пожалуйста выберите изображение');
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        addCover(formData);
    }, [selectedFile, addCover]);

    useEffect(() => {
        if (isMounted) return;

        if (selectedFile) handleUpload();
    }, [selectedFile, isMounted, handleUpload]);

    useEffect(() => {
        if (coverData) {
            dispatch(setCover(coverData?.file.url));
        }
    }, [coverData, dispatch]);

    const handleChange = async (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDeleteCover = () => {
        setIsMounted(false);
        dispatch(setCover(null));
        setSelectedFile(undefined);
        deleteCover(coverData?.file);
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {selectedFile || data?.cover ? (
                    isLoading ? (
                        <div className="cdx-loader" />
                    ) : (
                        <div className={styles.coverContainer}>
                            <img className={styles.coverImage} src={data?.cover} alt="Обложка статьи" />
                            {data?.cover && (
                                <Button
                                    className={styles.closeBtn}
                                    icon
                                    onClick={handleDeleteCover}
                                    variant="filledTonal"
                                >
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
                                    <span className="material-symbols-outlined">add_photo_alternate</span>
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
