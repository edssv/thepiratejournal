import { useRef } from 'react';

import Button from '@/components/common/Button/Button';

import styles from './Placeholder.module.scss';

const Placeholder: React.FC<{ setSelectedFile: React.Dispatch<React.SetStateAction<File | null>> }> = ({
  setSelectedFile,
}) => {
  const filePicker = useRef<HTMLInputElement>(null);

  const handleChange = async (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePick = () => {
    filePicker.current?.click();
  };

  return (
    <div className={styles.root}>
      <div className={styles.uploader} onClick={handlePick}>
        <div className={styles.placeholderContent}>
          <Button variant="filled">Загрузить изображение</Button>
          <div className={styles.instructions}>
            <p>Минимальный размер — 808 × 632 пикс.</p>
            <p>Максимальный вес — 8 МБ.</p>
          </div>
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
  );
};

export default Placeholder;
