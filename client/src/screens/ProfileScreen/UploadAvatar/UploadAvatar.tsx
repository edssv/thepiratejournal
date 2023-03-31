import { useEffect, useRef, useState } from 'react';

import { useUploadFileMutation } from '@/services/file/file.service';
import Button from '@/components/common/Button/Button';

export const UploadAvatar = () => {
    const filePicker = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState();

    const { mutate: upload, isLoading } = useUploadFileMutation();

    const handlePick = () => {
        filePicker.current?.click();
    };

    const handleChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        const handleUpload = async () => {
            if (!selectedFile) {
                return alert('Пожалуйста выберите изображение');
            }

            const formData = new FormData();
            formData.append('image', selectedFile);

            upload(formData);
        };

        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile, upload]);

    return (
        <div>
            <Button isLoading={isLoading} disabled={isLoading} onClick={handlePick} variant="filledTonal">
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
