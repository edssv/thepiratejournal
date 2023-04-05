import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import NotFoundPage from '../NotFoundScreen/NotFoundScreen';
import { useActions, useAuth } from '@/hooks';
import { EditorPageMode } from '@/lib/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useGetArticleQuery, useGetOneDraftQuery } from '@/services';
import Button from '@/components/common/Button/Button';
import { ConfirmDialog } from './ConfirmDialog/ConfirmDialog';
import { DraftInfoDialog } from './DraftInfoDialog/DraftInfoDialog';
import styles from './Editor.module.scss';
import Form from './Form/Form';

const EditorScreen: React.FC<{ mode: EditorPageMode }> = ({ mode }) => {
  const { back, query } = useRouter();

  const articleContentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { data } = useTypedSelector((state) => state.editorPage);
  const [blocks, setBlocks] = useState(data?.body ?? []);

  const { setMode, resetData } = useActions();
  const { isLoading, isError } = useGetArticleQuery(query.id as string, mode === EditorPageMode.EDIT);
  const { isLoading: isLoadingDraft, isError: isErrorDraft } = useGetOneDraftQuery(
    query.id as string,
    mode === EditorPageMode.DRAFT
  );

  useEffect(() => {
    setMode(mode);

    if (mode === EditorPageMode.NEW) return;

    if (!data.user) return;

    if (user?.id !== data.user.id) {
      back();
    }
  }, [mode, data, back, setMode, user?.id]);

  useEffect(() => {
    return () => {
      resetData();
      setMode(null);
      setBlocks([]);
    };
  }, [resetData, setMode, setBlocks]);

  // if (isLoading || isLoadingDraft) return null;
  if ((isError && mode === EditorPageMode.EDIT) || isErrorDraft) return <NotFoundPage />;

  return (
    <div className={styles.root}>
      <div className={styles.top_bar}>
        <Button onClick={() => back()} variant="outlined">
          Отмена
        </Button>
        <div className={styles.barRightButtons}>
          {mode !== EditorPageMode.EDIT && <DraftInfoDialog blocks={blocks} />}
          <ConfirmDialog articleContentRef={articleContentRef} blocks={blocks} />
        </div>
      </div>
      <div ref={articleContentRef} className={styles.container}>
        <Form setBlocks={setBlocks} />
      </div>
    </div>
  );
};

export default EditorScreen;
