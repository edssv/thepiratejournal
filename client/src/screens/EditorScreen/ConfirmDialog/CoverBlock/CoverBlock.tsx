import { useCallback, useEffect, useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useUploadFileMutation } from '@/services/file/file.service';
import Placeholder from './Placeholder/Placeholder';
import { CoverWindow } from './CoverWindow/CoverWindow';

import styles from './CoverBlock.module.scss';

const CoverBlock: React.FC = () => {
  const { setCover } = useActions();
  const [uploadFile, { data: coverData, isLoading, isError }] = useUploadFileMutation();

  const { data } = useTypedSelector((state) => state.editorPage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      alert('Пожалуйста выберите изображение');
    }

    const formData = new FormData();
    formData.append('image', selectedFile ?? '');

    uploadFile(formData);
  }, [selectedFile, uploadFile]);

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile, handleUpload]);

  useEffect(() => {
    if (coverData?.file?.url) {
      setCover(coverData?.file.url);
    }

    if (isError) {
      setSelectedFile(null);
    }
  }, [coverData, setCover, isError]);

  const getContent = () => {
    if (selectedFile || data.cover) return <CoverWindow isLoading={isLoading} setSelectedFile={setSelectedFile} />;
    return <Placeholder setSelectedFile={setSelectedFile} />;
  };

  return (
    <div className={styles.root}>
      <h4 className="confirmDialogItemLabel">
        Обложка статьи <span>(обязательно)</span>
      </h4>
      <div className={styles.container}>{getContent()}</div>
    </div>
  );
};

export default CoverBlock;
