import { toHtml } from '@/helpers/toHtml';

import styles from './Body.module.scss';

const Body: React.FC<{ data: string }> = ({ data }) => (
  <div className={styles.root}>
    <div className={styles.content}>{toHtml(JSON.parse(data))}</div>
  </div>
);

export default Body;
