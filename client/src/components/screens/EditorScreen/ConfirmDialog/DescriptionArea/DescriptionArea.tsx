import { useFormContext } from 'react-hook-form';

import styles from './DescriptionArea.module.scss';

export const DescriptionArea: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div>
      <h4 className='confirmDialogItemLabel'>
        Описание <span>(до 203 символов)</span>
      </h4>
      <textarea
        className={styles.textarea}
        maxLength={203}
        placeholder='Добавь короткое описание статьи'
        {...register('description', {
          required: 'Обязательное поле.',
          minLength: { value: 30, message: 'Минимальная длина описания - 30 символов.' }
        })}
      />
    </div>
  );
};
