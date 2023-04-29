import { useEffect, useRef, useState } from 'react';

import Button from '@/components/common/Button/Button';
import { useUploadFileMutation } from '@/services/file/file.service';

export const UploadAvatar = () => {
  const filePicker = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState();

  const [upload, { isLoading }] = useUploadFileMutation();

  const handlePick = () => {
    filePicker.current?.click();
  };

  const handleChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const handleUpload = () => {
      if (!selectedFile) return null;

      const formData = new FormData();
      formData.append('image', selectedFile);

      return upload(formData);
    };

    if (selectedFile) {
      handleUpload();
    }

    return () => {};
  }, [selectedFile, upload]);

  return (
    <div>
      <Button disabled={isLoading} isLoading={isLoading} variant='filledTonal' onClick={handlePick}>
        Изменить аватар
      </Button>
      <input
        ref={filePicker}
        accept='image/jpeg,image/png,image/webp'
        className='hidden'
        name='photo'
        type='file'
        onChange={handleChange}
      />
    </div>
  );
};
