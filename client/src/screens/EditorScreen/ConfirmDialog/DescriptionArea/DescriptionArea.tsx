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
      <h4 className="confirmDialogItemLabel">
        Описание <span>(до 203 символов)</span>
      </h4>
      <textarea
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          setTextareaValue(e.currentTarget.value);
          setDescription(e.currentTarget.value);
        }}
        className={styles.textarea}
        value={textareaValue}
        maxLength={203}
        placeholder="Добавь короткое описание статьи"
      />
    </div>
  );
};
