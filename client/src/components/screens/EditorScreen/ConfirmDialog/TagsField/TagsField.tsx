import clsx from 'clsx';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './TagsField.module.scss';

export const TagsField = () => {
  const { setTags } = useActions();
  const { data } = useTypedSelector((state) => state.editorPage);

  const removeTags = (indexToRemove: number) => {
    if (data.tags) {
      const tags = data?.tags.filter((_, index) => index !== indexToRemove);
      setTags([...tags]);
    }
  };

  const addTags = (event: any) => {
    if (event.target.value !== '') {
      setTags([...(data?.tags ?? []), event.target.value]);
      event.target.value = '';
    }
  };

  return (
    <div>
      {' '}
      <h4 className='confirmDialogItemLabel'>
        Теги статьи <span>(до 10)</span>
      </h4>
      <div className={styles.root}>
        <div className={clsx(styles.inputWrapper, 'inputWrapper')}>
          <ul className={styles.tagsList}>
            {data?.tags?.map((tag, index) => (
              <li key={index} className={styles.tag}>
                <span className={styles.tagTitle}>{tag}</span>
                <button className={styles.tagCloseButton} onClick={() => removeTags(index)}>
                  <span className='material-symbols-outlined'>cancel</span>
                </button>
              </li>
            ))}
          </ul>
          <input
            placeholder='Добавь теги'
            type='text'
            onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
          />
        </div>
      </div>
    </div>
  );
};
