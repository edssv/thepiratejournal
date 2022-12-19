import { Button } from '@react-spectrum/button';
import React, { useEffect, useRef, useState } from 'react';
import { useUploadAvatarMutation } from '../../../redux';

export const UploadAvatar = () => {
    const filePicker = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState();

    const [uploadAvatar] = useUploadAvatarMutation();

    const handleUpload = async () => {
        if (!selectedFile) {
            return alert('Пожалуйста выберите изображение');
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log(formData);

        uploadAvatar(formData);
    };

    const handlePick = () => {
        filePicker.current?.click();
    };

    const handleChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
            console.log(selectedFile);
        }
    }, [selectedFile]);
    return (
        <div>
            <Button onPress={handlePick} variant="accent">
                Изменить аватар
            </Button>
            <input
                ref={filePicker}
                className="hidden"
                type="file"
                onChange={handleChange}
                accept="image/jpeg,image/png,image/webp"
                name="photo"
            />
        </div>
    );
};
