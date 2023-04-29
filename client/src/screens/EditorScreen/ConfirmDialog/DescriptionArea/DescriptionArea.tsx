import { useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './DescriptionArea.module.scss';

export const DescriptionArea = () => {
  const { setDescription } = useActions();
  const { description } = useTypedSelector((state) => state.editorPage.data);
  const [textareaValue, setTextareaValue] = useState(description);

  return (
    <div>
      <h4 className='confirmDialogItemLabel'>
        Описание <span>(до 203 символов)</span>
      </h4>
      <textarea
        className={styles.textarea}
        maxLength={203}
        placeholder='Добавь короткое описание статьи'
        value={textareaValue}
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          setTextareaValue(e.currentTarget.value);
          setDescription(e.currentTarget.value);
        }}
      />
    </div>
  );
};
