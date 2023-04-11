import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';

import { robotoMono } from '@/components/fonts/roboto-mono';

import styles from './CreatedAt.module.scss';

const CreatedAt: React.FC<{ createdAt: Date }> = ({ createdAt }) => {
  const date = moment(createdAt).format('DD.MM.YY');

  return <div className={clsx(styles.root, robotoMono.className)}>{date}</div>;
};

export default CreatedAt;
