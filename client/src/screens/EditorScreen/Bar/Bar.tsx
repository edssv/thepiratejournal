import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import { EditorFormStatus, EditorPageMode } from '@/lib/enums';
import { Block } from '@/interfaces/block.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import DraftSave from '../DraftSave/DraftSave';

import styles from './Bar.module.scss';
import { useState } from 'react';
import LeaveDialog from './LeaveDialog/LeaveDialog';

interface BarProps {
  mode: EditorPageMode;
  blocks: Block[];
  articleContentRef: React.Ref<HTMLDivElement>;
  isLoading: boolean;
  isError: boolean;
}

const Bar: React.FC<BarProps> = ({ mode, blocks, articleContentRef, isLoading, isError }) => {
  const { back } = useRouter();

  const { formStatus } = useTypedSelector((state) => state.editorPage);
  const [isOpenLeaveDialog, setIsOpenLeaveDialog] = useState(false);

  const getStatusContent = () => {
    if (isLoading) {
      return (
        <>
          <span className="material-symbols-outlined">cloud_upload</span>Сохранение
        </>
      );
    }
    if (isError) {
      return (
        <>
          <span className="material-symbols-outlined">cloud_off</span>Не удалось сохранить
        </>
      );
    }

    if (formStatus === EditorFormStatus.MODIFIED) {
      return (
        <>
          <span className="material-symbols-outlined">edit</span> Изменено
        </>
      );
    }
    if (formStatus === EditorFormStatus.SAVED) {
      return (
        <>
          <span className="material-symbols-outlined">cloud_done</span> Сохранено
        </>
      );
    }

    return;
  };

  return (
    <div className={styles.root}>
      <div></div>
      <AnimatePresence mode="wait">
        <motion.div
          className={clsx(styles.formStatus, 'icon-center')}
          key={formStatus}
          initial={{ opacity: 0, fontVariationSettings: '"FILL" 0, "wght" 500, "opsz" 24' }}
          animate={{ opacity: 1, fontVariationSettings: '"FILL" 0, "wght" 300, "opsz" 24' }}
          transition={{ delay: 0.3 }}
        >
          {getStatusContent()}
        </motion.div>
      </AnimatePresence>
      <div className={styles.buttons}>
        <Button onClick={() => setIsOpenLeaveDialog(true)}>Отмена</Button>
        {mode !== EditorPageMode.EDIT && <DraftSave blocks={blocks} />}
        <ConfirmDialog articleContentRef={articleContentRef} blocks={blocks} />
      </div>
      <LeaveDialog isOpen={isOpenLeaveDialog} setIsOpen={setIsOpenLeaveDialog} />
    </div>
  );
};

export default Bar;
