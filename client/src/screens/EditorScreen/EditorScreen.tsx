import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { BlockType } from '@/gql/__generated__';
import { useActions, useAuth } from '@/hooks';
import { EditorFormStatus, EditorPageMode } from '@/lib/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCreateDraftMutation, useUpdateDraftMutation } from '@/services';
import Form from './Form/Form';
import Bar from './Bar/Bar';

import styles from './EditorScreen.module.scss';

interface EditorScreenProps {
  body: BlockType[] | null | undefined;
  mode: EditorPageMode;
}

const EditorScreen: React.FC<EditorScreenProps> = ({ body, mode }) => {
  const { back } = useRouter();

  const articleContentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { data, formStatus } = useTypedSelector((state) => state.editorPage);

  const [blocks, setBlocks] = useState(body ?? []);

  const { setMode, resetData, setFormStatus, setDraftId } = useActions();

  const {
    mutate: createDraft,
    data: draftData,
    isLoading: isLoadingCreatDraft,
    isError: isErrorCreateDraft,
  } = useCreateDraftMutation();
  const {
    mutate: updateDraft,
    isLoading: isLoadingUpdateDraft,
    isError: isErrorUpdateDraft,
  } = useUpdateDraftMutation();

  useEffect(() => {
    setMode(mode);

    if (mode === EditorPageMode.NEW) return;
    if (!data.user) return;

    if (user?.id !== +data.user.id) {
      back();
    }
  }, [mode, data, back, setMode, user?.id]);

  useEffect(() => {
    if (mode !== EditorPageMode.NEW) return;

    if (!data.title && !blocks.length) {
      setFormStatus(EditorFormStatus.UNCHANGED);
    }

    if (formStatus === EditorFormStatus.SAVED || formStatus === EditorFormStatus.UNCHANGED) return;

    if (!draftData?.id) {
      createDraft(
        { ...data, body: [...blocks] },
        {
          onSuccess: ({ id }) => {
            setDraftId(id), setFormStatus(EditorFormStatus.SAVED);
          },
        }
      );
    }

    if (draftData?.id) {
      updateDraft(
        { ...draftData, ...data, body: [...blocks] },
        { onSuccess: () => setFormStatus(EditorFormStatus.SAVED) }
      );
    }
  }, [data, blocks, draftData, formStatus]);

  useEffect(() => {
    return () => {
      resetData();
      setMode(null);
      setBlocks([]);
    };
  }, [resetData, setMode, setBlocks]);

  return (
    <div className={styles.root}>
      <div ref={articleContentRef} className={styles.container}>
        <Form blocks={blocks} setBlocks={setBlocks} />
      </div>
      <Bar
        mode={mode}
        blocks={blocks}
        articleContentRef={articleContentRef}
        isLoading={isLoadingCreatDraft || isLoadingUpdateDraft}
        isError={isErrorCreateDraft || isErrorUpdateDraft}
      />
    </div>
  );
};

export default EditorScreen;
