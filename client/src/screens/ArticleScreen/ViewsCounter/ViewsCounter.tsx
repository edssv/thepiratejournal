import clsx from 'clsx';

import styles from './ViewsCounter.module.scss';
import { robotoMono } from '@/components/fonts/roboto-mono';

const ViewsCounter: React.FC<{ data: number }> = ({ data }) => {
  return (
    <div className={clsx(styles.root, robotoMono.className, 'icon-center')}>
      <span className="material-symbols-outlined">visibility</span> {data}
    </div>
  );
};

export default ViewsCounter;
