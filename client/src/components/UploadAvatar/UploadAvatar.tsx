import { useState, useRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import avatarPlaceholder from '@/assets/img/avatar-material.png';
import { useUploadFileMutation } from '@/services/file/file.service';

import Avatar from '../Avatar/Avatar';
import Button from '../common/Button/Button';
import type { ProfileFormData } from '../screens/dashboard/SettingsScreen/SettingsScreen';

const UploadAvatar = () => {
  const filePicker = useRef<HTMLInputElement | null>(null);
  const { getValues, register, setValue } = useFormContext<ProfileFormData>();
  const [avatar, setAvatar] = useState<string | null>(getValues('image'));

  const [uploadFile] = useUploadFileMutation();

  const handleUpload = useCallback(() => {
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('image', filePicker?.current?.files[0]);

    uploadFile(formData)
      .unwrap()
      .then(({ file }) => {
        setValue('image', file.url);
        setAvatar(file.url);
      });
  }, [setAvatar, filePicker, setValue, uploadFile]);

  const handleDelete = () => {
    setValue('image', null);
    setAvatar(null);
  };

  const { ref, ...rest } = register('image', { onChange: handleUpload });

  const handlePick = () => {
    filePicker.current?.click();
  };

  return (
    <div className='flex gap-6'>
      <div>
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            filePicker.current = e;
          }}
          accept='image/jpeg,image/png,image/webp'
          className='full-hidden'
          type='file'
        />
        <button onClick={handlePick}>
          <Avatar
            imageSrc={avatar || avatarPlaceholder.src}
            width={80}
            sizes='(max-width: 768px) 40vw,
          (max-width: 1200px) 20vw,
          15vw'
          />
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <button className='text-sm text-primary' onClick={handlePick}>
            Обновить
          </button>
          <button className='text-sm text-error  disabled:opacity-40' disabled={!avatar} onClick={handleDelete}>
            Удалить
          </button>
        </div>
        <span className='text-on-surface-variant'>
          Рекомендуется: квадратный JPG, PNG или WEBP размером не менее 1000 пикселей на сторону.
        </span>
      </div>
    </div>
  );
};

export default UploadAvatar;
