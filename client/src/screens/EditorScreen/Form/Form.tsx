import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorFormStatus } from '@/lib/enums';
import { Block } from '@/interfaces/block.interface';

import styles from './Form.module.scss';
import TitleBlock from './TitleBlock/TitleBlock';

const Editor = dynamic(() => import('./EditorJs/EditorJS'), { ssr: false });

interface FormProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const Form: React.FC<FormProps> = ({ blocks, setBlocks }) => {
  const { setFormStatus } = useActions();
  const { data, formStatus } = useTypedSelector((state) => state.editorPage);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (formStatus === EditorFormStatus.MODIFIED) {
      window.addEventListener('beforeunload', handler);

      return () => {
        window.removeEventListener('beforeunload', handler);
      };
    }

    return;
  }, [formStatus]);

  useEffect(() => {
    if (data.title || blocks.length) {
      setFormStatus(EditorFormStatus.MODIFIED);
    }
  }, [data.title, blocks]);

  return (
    <form className={styles.root}>
      <TitleBlock />
      <Editor setBlocks={setBlocks} />
    </form>
  );
};

export default Form;
