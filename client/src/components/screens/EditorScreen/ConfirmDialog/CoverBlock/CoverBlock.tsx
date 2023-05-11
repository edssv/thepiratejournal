import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useUploadFileMutation } from '@/services/file/file.service';

import styles from './CoverBlock.module.scss';
import Placeholder from './Placeholder/Placeholder';
import { Window } from './Window/Window';

const CoverBlock: React.FC = () => {
  const filePicker = useRef<HTMLInputElement | null>(null);
  const { getValues, resetField, setValue } = useFormContext();
  const [cover, setCover] = useState<string | null>(getValues('cover'));

  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleUpload = useCallback(() => {
    if (!filePicker?.current?.files) return;

    const formData = new FormData();
    formData.append('image', filePicker?.current?.files[0]);

    uploadFile(formData)
      .unwrap()
      .then(({ file }) => {
        setValue('cover', file.url);
        setCover(file.url);
      });
  }, [uploadFile, setValue]);

  const handleDeleteCover = () => {
    filePicker.current = null;
    resetField('cover');
    setCover(null);
  };

  return (
    <div className={styles.root}>
      <h4 className='confirmDialogItemLabel'>
        Обложка статьи <span>(обязательно)</span>
      </h4>
      <div className={styles.container}>
        {cover ? (
          <Window cover={cover} handleDeleteCover={handleDeleteCover} isLoading={isLoading} />
        ) : (
          <Placeholder filePicker={filePicker} handleUpload={handleUpload} />
        )}
      </div>
    </div>
  );
};

export default CoverBlock;
