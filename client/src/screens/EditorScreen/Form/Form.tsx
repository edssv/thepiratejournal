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
  const { data } = useTypedSelector((state) => state.editorPage);

  const { setFormStatus } = useActions();

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
