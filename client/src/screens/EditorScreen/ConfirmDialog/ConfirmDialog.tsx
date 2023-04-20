import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Block } from '@/gql/__generated__';
import { EditorPageMode, UserRole } from '@/lib/enums';
import { useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import { Dialog, DialogCancelButton, DialogContent, DialogControls } from '@/components/common/Dialog/Dialog';
import DraftSave from '../DraftSave/DraftSave';
import CoverBlock from './CoverBlock/CoverBlock';
import { ListBoxPicker } from './ListBoxPicker/ListBoxPicker';
import { DescriptionArea } from './DescriptionArea/DescriptionArea';
import { TagsField } from './TagsField/TagsField';
import TitleField from './TitleField/TitleField';
import TypePicker from './TypePicker/TypePicker';
import SaveArticle from './SaveArticle/SaveArticle';

import styles from './ConfirmDialog.module.scss';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });
interface ConfirmDialogProps {
  articleContentRef?: React.Ref<HTMLDivElement>;
  blocks: Block[];
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ articleContentRef, blocks }) => {
  const { user } = useAuth();
  const { data, mode } = useTypedSelector((state) => state.editorPage);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {' '}
      <Button onClick={() => setIsOpen(true)} disabled={!(data?.title && blocks.length)} variant="filled">
        Продолжить
      </Button>
      <DialogTrigger isVisible={isOpen} onClose={setIsOpen}>
        <Dialog size="M" mobileType="fullscreen">
          <DialogContent>
            <div className={styles.plateContent}>
              <div className={styles.coverColumn}>
                <CoverBlock />
              </div>
              <div className={styles.settingsColumn}>
                <TitleField />
                <DescriptionArea />
                <ListBoxPicker />
                <TagsField />
                {mode === EditorPageMode.NEW && (user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) && (
                  <TypePicker />
                )}
              </div>
            </div>
          </DialogContent>
          <DialogControls className={styles.controls}>
            <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
            <DraftSave blocks={blocks} />
            <SaveArticle articleContentRef={articleContentRef} blocks={blocks} />
          </DialogControls>
        </Dialog>
      </DialogTrigger>
    </>
  );
};

export default ConfirmDialog;
