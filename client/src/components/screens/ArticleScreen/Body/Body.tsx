import type { Block } from '@/gql/__generated__';
import { toHtml } from '@/helpers/toHtml';

import styles from './Body.module.scss';

const Body: React.FC<{ body: Block[] }> = ({ body }) => {
  const getBodyContent = () => toHtml(body);
  return (
    <div className={styles.root}>
      <div className={styles.content}>{getBodyContent()}</div>
    </div>
  );
};

export default Body;
