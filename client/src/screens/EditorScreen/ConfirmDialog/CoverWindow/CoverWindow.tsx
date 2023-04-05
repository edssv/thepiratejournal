import { useCallback, useEffect, useRef, useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useUploadFileMutation } from '@/services/file/file.service';
import Button from '@/components/common/Button/Button';

import styles from './CoverWindow.module.scss';

export const CoverWindow: React.FC = () => {
  const filePicker = useRef<HTMLInputElement>(null);
  const { setCover } = useActions();
  const { mutate, data: coverData, isLoading } = useUploadFileMutation();

  const { data } = useTypedSelector((state) => state.editorPage);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handlePick = () => {
    filePicker.current?.click();
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      alert('Пожалуйста выберите изображение');
    }

    const formData = new FormData();
    formData.append('image', selectedFile ?? '');

    mutate(formData);
  }, [selectedFile, mutate]);

  useEffect(() => {
    if (selectedFile) handleUpload();
  }, [selectedFile, handleUpload]);

  useEffect(() => {
    if (coverData) setCover(coverData?.file.url);
  }, [coverData, setCover]);

  const handleChange = async (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDeleteCover = () => {
    setCover(null);
    setSelectedFile(undefined);
  };

  return (
    <div className={styles.root}>
      <h4 className="confirmDialogItemLabel">
        Обложка статьи <span>(обязательно)</span>
      </h4>
      <div className={styles.container}>
        {selectedFile || data?.cover ? (
          isLoading ? (
            <div className="cdx-loader" />
          ) : (
            <div className={styles.coverContainer}>
              <img className={styles.coverImage} src={data?.cover} alt="Обложка статьи" />
              {data?.cover && (
                <Button className={styles.closeBtn} icon onClick={handleDeleteCover} variant="filledTonal">
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              )}
            </div>
          )
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.uploader} onClick={handlePick}>
              <div className={styles.placeholderContent}>
                <Button variant="filled">Загрузить изображение</Button>
                <p>
                  Минимальное размер — 808 × 632 пикс. <br /> Максимальный вес — 8 МБ.
                </p>
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
