import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { resizeTextareaHeight } from '@/helpers';
import { EditorFormStatus } from '@/lib/enums';
import { Block } from '@/interfaces/block.interface';

import styles from './Form.module.scss';

const Editor = dynamic(() => import('../EditorJs/EditorJS'), { ssr: false });

const Form: React.FC<{ setBlocks: React.Dispatch<React.SetStateAction<Block[]>> }> = ({ setBlocks }) => {
  const { setFormStatus, setTitle } = useActions();
  const { data, formStatus } = useTypedSelector((state) => state.editorPage);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (formStatus === 'modified') {
      window.addEventListener('beforeunload', handler);

      return () => {
        window.removeEventListener('beforeunload', handler);
      };
    }

    return;
  }, [formStatus]);

  if (typeof document !== 'undefined') resizeTextareaHeight();

  return (
    <form
      onChange={() => {
        if (data?.title) {
          setFormStatus(EditorFormStatus.MODIFIED);
        }
      }}
      className={styles.root}
    >
      <div className={styles.textareaWrapper}>
        <textarea
          maxLength={68}
          autoFocus={true}
          placeholder="Дай мне имя"
          className={styles.writingHeader}
          value={data?.title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ height: 42 }}
        />
      </div>
      <Editor setBlocks={setBlocks} />
    </form>
  );
};

export default Form;
