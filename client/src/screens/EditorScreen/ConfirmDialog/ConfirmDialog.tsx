import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaPredicate } from 'react-media-hook';

import { Block } from '@/interfaces/block.interface';
import { UserRole } from '@/lib/enums';
import { useAuth } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import { Dialog, DialogCancelButton, DialogContent, DialogControls } from '@/components/common/Dialog/Dialog';
import { DraftInfoDialog } from '../DraftInfoDialog/DraftInfoDialog';
import CoverBlock from './CoverBlock/CoverBlock';
import { ListBoxPicker } from './ListBoxPicker/ListBoxPicker';
import { DescriptionArea } from './DescriptionArea/DescriptionArea';
import { TagsField } from './TagsField/TagsField';
import TitleField from './TitleField/TitleField';
import TypePicker from './TypePicker/TypePicker';

import styles from './ConfirmDialog.module.scss';

const DialogTrigger = dynamic(() => import('@/components/common/DialogTrigger/DialogTrigger'), { ssr: false });
const SaveArticle = dynamic(() => import('./SaveArticle/SaveArticle'), { ssr: false });
interface ConfirmDialogProps {
  articleContentRef?: React.Ref<HTMLDivElement>;
  blocks: Block[];
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ articleContentRef, blocks }) => {
  const { user } = useAuth();
  const { data } = useTypedSelector((state) => state.editorPage);
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaPredicate('(max-width: 551px)');

  return (
    <>
      {' '}
      <Button onClick={() => setIsOpen(true)} disabled={!data?.title} variant="filled">
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
                {(user?.role === UserRole.EDITOR || user?.role === UserRole.ADMIN) && <TypePicker />}
              </div>
            </div>
          </DialogContent>
          <DialogControls className={styles.controls}>
            <DialogCancelButton onClick={() => setIsOpen(false)}>Отмена</DialogCancelButton>
            <DraftInfoDialog blocks={blocks} />
            <SaveArticle articleContentRef={articleContentRef} blocks={blocks} />
          </DialogControls>
        </Dialog>
      </DialogTrigger>
    </>
  );
};
