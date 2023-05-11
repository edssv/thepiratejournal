import clsx from 'clsx';

import { robotoMono } from '@/components/fonts/roboto-mono';

import styles from './ViewsCounter.module.scss';

const ViewsCounter: React.FC<{ data: number }> = ({ data }) => (
  <div className={clsx(styles.root, robotoMono.className, 'icon-center')}>
    <span className='material-symbols-outlined'>visibility</span> {data}
  </div>
);

export default ViewsCounter;
