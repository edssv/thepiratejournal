import dynamic from 'next/dynamic';

import type { EditorFormStatus } from '@/lib/enums';

import styles from './Form.module.scss';
import TitleBlock from './TitleBlock/TitleBlock';

const Editor = dynamic(() => import('./Editor/Editor'), { ssr: false });

interface FormProps {
  setStatus: React.Dispatch<React.SetStateAction<EditorFormStatus>>;
}

const Form: React.FC<FormProps> = ({ setStatus }) => (
  <form className={styles.root}>
    <TitleBlock />
    <Editor setStatus={setStatus} />
  </form>
);

export default Form;
