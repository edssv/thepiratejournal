import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/common/Button/Button';
import { EditorFormStatus, EditorPageMode } from '@/lib/enums';

import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DraftSave from '../DraftSave/DraftSave';

import styles from './Bar.module.scss';
import LeaveDialog from './LeaveDialog/LeaveDialog';

interface BarProps {
  mode: EditorPageMode;
  isLoading: boolean;
  isError: boolean;
  status: EditorFormStatus;
}

const Bar: React.FC<BarProps> = ({ isError, isLoading, mode, status }) => {
  const { back } = useRouter();
  const [isOpenLeaveDialog, setIsOpenLeaveDialog] = useState(false);

  const getStatusContent = () => {
    if (isLoading) {
      return (
        <>
          <span className='material-symbols-outlined'>cloud_upload</span>Сохранение
        </>
      );
    }
    if (isError) {
      return (
        <>
          <span className='material-symbols-outlined'>cloud_off</span>Не удалось сохранить
        </>
      );
    }

    if (status === EditorFormStatus.MODIFIED) {
      return (
        <>
          <span className='material-symbols-outlined'>edit</span> Изменено
        </>
      );
    }
    if (status === EditorFormStatus.SAVED) {
      return (
        <>
          <span className='material-symbols-outlined'>cloud_done</span> Сохранено
        </>
      );
    }
    return null;
  };

  return (
    <div className={styles.root}>
      <div />
      {mode === EditorPageMode.NEW && (
        <AnimatePresence mode='wait'>
          <motion.div
            key={status}
            animate={{ opacity: 1, fontVariationSettings: '"FILL" 0, "wght" 300, "opsz" 24' }}
            className={clsx(styles.formStatus, 'icon-center')}
            initial={{ opacity: 0, fontVariationSettings: '"FILL" 0, "wght" 500, "opsz" 24' }}
            transition={{ delay: 0.3 }}
          >
            {getStatusContent()}
          </motion.div>
        </AnimatePresence>
      )}
      <div className={styles.buttons}>
        <Button onClick={() => (status === EditorFormStatus.UNCHANGED ? back() : setIsOpenLeaveDialog(true))}>
          Отмена
        </Button>
        {mode !== EditorPageMode.EDIT && <DraftSave />}
        <ConfirmDialog mode={mode} />
      </div>
      <LeaveDialog isOpen={isOpenLeaveDialog} setIsOpen={setIsOpenLeaveDialog} />
    </div>
  );
};

export default Bar;
