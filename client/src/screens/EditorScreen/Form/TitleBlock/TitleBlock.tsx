import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { resizeTextareaHeight } from '@/helpers';

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
        maxLength={68}
        autoFocus={true}
        placeholder="Название статьи"
        className={styles.writingHeader}
        value={value ?? data?.title}
        onChange={onChangeTitle}
        style={{ height: 42 }}
      />
    </div>
  );
};

export default TitleBlock;
