import moment from 'moment';
import 'moment/locale/ru';

import { robotoMono } from '@/app/layout';
import { cn } from '@/lib/utils';

const CreatedAt: React.FC<{ createdAt: string }> = ({ createdAt }) => {
  const date = moment(createdAt).format('DD.MM.YY');

  return <div className={cn('text-left text-sm sm:text-base', robotoMono.className)}>{date}</div>;
};

export default CreatedAt;
