import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
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
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';

import styles from './CoverWindow.module.scss';

type CoverWindowProps = {
    windowOpen: boolean;
    uploadedUrl: string;
    setUploadedUrl: any;
    onClickSave: any;
    selectedFile: any;
    setSelectedFile: any;
};

type PopupClick = MouseEvent & {
    path: Node[];
};

export const CoverWindow: React.FC<CoverWindowProps> = ({
    uploadedUrl,
    setUploadedUrl,
    onClickSave,
    selectedFile,
    setSelectedFile,
}) => {
    const filePicker = useRef<HTMLInputElement>(null);

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
        formData.append('cover', selectedFile);

        addCover(formData);
    };

    useEffect(() => {
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
            setUploadedUrl('');
            setSelectedFile('');
            deleteCover(data.file);
        }
    };

    return (
        <div className={styles.root}>
            <DialogTrigger>
                <Button variant="primary">Обложка</Button>
                {(close) => (
                    <Dialog>
                        <Heading>Выбор обложки</Heading>
                        <Divider />
                        <Content maxWidth={568} height={308} width="100%">
                            {!selectedFile ? (
                                <IllustratedMessage height={300}>
                                    <button onClick={handlePick}>
                                        <Upload />
                                        <Heading>Нажмите, чтобы выбрать файл</Heading>
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
                                    handleDeleteCover();
                                    close();
                                }}>
                                Отменить
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
            </DialogTrigger>
        </div>
    );
};
