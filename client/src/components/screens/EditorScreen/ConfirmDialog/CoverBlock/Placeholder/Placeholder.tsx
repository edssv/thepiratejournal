import { useFormContext } from 'react-hook-form';

import Button from '@/components/common/Button/Button';

import styles from './Placeholder.module.scss';

interface PlaceholderProps {
  handleUpload: () => void;
  filePicker: React.MutableRefObject<HTMLInputElement | null>;
}

const Placeholder: React.FC<PlaceholderProps> = ({ filePicker, handleUpload }) => {
  const { register } = useFormContext();
  const { ref, ...rest } = register('cover', { required: 'Обязательное поле', onChange: handleUpload });

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
          {...rest}
          ref={(e) => {
            ref(e);
            filePicker.current = e;
          }}
          accept='image/jpeg,image/png,image/webp'
          className='full-hidden'
          id='fileInput'
          type='file'
        />
      </div>
    </div>
  );
};

export default Placeholder;
