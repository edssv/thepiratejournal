import { BlockType } from '@/gql/__generated__';
import { toHtml } from '@/helpers/toHtml';

import styles from './Body.module.scss';

const Body: React.FC<{ body: BlockType[] }> = ({ body }) => {
  const getBodyContent = () => {
    return toHtml(body);
  };
  return (
    <div className={styles.root}>
      <div dangerouslySetInnerHTML={{ __html: getBodyContent() }} className={styles.content} />
    </div>
  );
};

export default Body;
