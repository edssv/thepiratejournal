import { useRef } from 'react';

import Button from '@/components/common/Button/Button';

import styles from './Placeholder.module.scss';

const Placeholder: React.FC<{
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}> = ({ setSelectedFile }) => {
  const filePicker = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (!event?.target.files?.length) return;
    setSelectedFile(event?.target?.files[0]);
  };

  const handlePick = () => {
    filePicker.current?.click();
  };

  return (
    <div className={styles.root}>
      <div className={styles.uploader}>
        <div className={styles.placeholderContent}>
          <Button variant='filled' onClick={handlePick}>
            Загрузить изображение
          </Button>
          <div className={styles.instructions}>
            <p>Минимальный размер — 808 × 632 пикс.</p>
            <p>Максимальный вес — 8 МБ.</p>
          </div>
        </div>
        <input
          ref={filePicker}
          accept='image/jpeg,image/png,image/webp'
          className='hidden'
          name='photo'
          type='file'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Placeholder;
