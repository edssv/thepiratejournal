import { useFormContext } from 'react-hook-form';

import { resizeTextareaHeight } from '@/helpers';

import styles from './TitleBlock.module.scss';

const TitleBlock: React.FC = () => {
  const { getValues, register } = useFormContext();
  const title = getValues('title');

  if (typeof document !== 'undefined') resizeTextareaHeight();

  return (
    <div className={styles.root}>
      <textarea
        className={styles.writingHeader}
        defaultValue={title}
        maxLength={68}
        placeholder='Название статьи'
        style={{ height: 64 }}
        {...register('title', {
          required: 'Заголовок - обязательное поле',
          minLength: { value: 6, message: 'Минимальная длина заголовка - 6 символов.' },
          maxLength: { value: 68, message: 'Максимальная длина заголовка - 68 символов.' }
        })}
      />
    </div>
  );
};

export default TitleBlock;
