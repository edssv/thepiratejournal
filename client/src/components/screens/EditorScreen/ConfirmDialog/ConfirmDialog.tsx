import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import { Dialog, DialogCancelButton, DialogContent, DialogControls } from '@/components/common/DialogOld/Dialog';
import { EditorPageMode } from '@/lib/enums';

import DraftSave from '../DraftSave/DraftSave';

import styles from './ConfirmDialog.module.scss';
import CoverBlock from './CoverBlock/CoverBlock';
import { DescriptionArea } from './DescriptionArea/DescriptionArea';
import SaveArticle from './SaveArticle/SaveArticle';
import TitleField from './TitleField/TitleField';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), {
  ssr: false
});
interface ConfirmDialogProps {
  mode: EditorPageMode;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ mode }) => {
  const { formState } = useFormContext();
  const { isDirty } = formState;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {' '}
      <Button disabled={mode === EditorPageMode.NEW && !isDirty} variant='filled' onClick={() => setIsOpen(true)}>
        Продолжить
      </Button>
      <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
        <Dialog mobileType='fullscreen' size='M'>
          <DialogContent>
            <div className={styles.plateContent}>
              <div className={styles.coverColumn}>
                <CoverBlock />
              </div>
              <div className={styles.settingsColumn}>
                <TitleField />
                <DescriptionArea />
              </div>
            </div>
          </DialogContent>
          <DialogControls className={styles.controls}>
            <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
            <DraftSave />
            <SaveArticle mode={mode} />
          </DialogControls>
        </Dialog>
      </DialogTrigger>
    </>
  );
};

export default ConfirmDialog;
