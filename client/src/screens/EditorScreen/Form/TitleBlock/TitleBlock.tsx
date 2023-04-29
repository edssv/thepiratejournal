import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

import { resizeTextareaHeight } from '@/helpers';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './TitleBlock.module.scss';

const TitleBlock = () => {
  const { data } = useTypedSelector((state) => state.editorPage);
  const [value, setValue] = useState<string>();

  const { setTitle } = useActions();

  if (typeof document !== 'undefined') resizeTextareaHeight();

  const debounceFunction = debounce((title) => {
    setTitle(title);
  }, 300);
  const debounceUseCallback = useCallback(
    (title: string | undefined) => {
      debounceFunction(title);
    },
    [debounceFunction]
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
    debounceUseCallback(e?.target.value);
    setValue(e?.target.value);
  };

  return (
    <div className={styles.root}>
      <textarea
        className={styles.writingHeader}
        maxLength={68}
        placeholder='Название статьи'
        style={{ height: 42 }}
        value={value ?? data?.title}
        onChange={onChangeTitle}
      />
    </div>
  );
};

export default TitleBlock;
