import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { Block, useCreateDraftMutation, useUpdateDraftMutation } from '@/gql/__generated__';
import { useActions, useAuth } from '@/hooks';
import { EditorFormStatus, EditorPageMode } from '@/lib/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Form from './Form/Form';
import Bar from './Bar/Bar';

import styles from './EditorScreen.module.scss';

interface EditorScreenProps {
  body: Block[] | null | undefined;
  mode: EditorPageMode;
}

const EditorScreen: React.FC<EditorScreenProps> = ({ body, mode }) => {
  const { back } = useRouter();

  const articleContentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { data, formStatus, draftId } = useTypedSelector((state) => state.editorPage);
  const [blocks, setBlocks] = useState(body ?? []);

  const { setMode, resetData, setFormStatus, setDraftId } = useActions();
  const [createDraft, { data: draftData, loading: isLoadingCreatDraft, error: isErrorCreateDraft }] =
    useCreateDraftMutation();
  const [updateDraft, { loading: isLoadingUpdateDraft, error: isErrorUpdateDraft }] = useUpdateDraftMutation();

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

    if (!draftId) {
      createDraft({
        variables: {
          createDraftInput: {
            title: data.title,
            description: data.description,
            cover: data.cover,
            body: blocks,
            category: data.category,
            tags: data.tags,
          },
        },
        onCompleted: ({ createDraft }) => {
          setDraftId(createDraft.id), setFormStatus(EditorFormStatus.SAVED);
        },
      });
    }

    if (draftId) {
      updateDraft({
        variables: {
          updateDraftInput: {
            title: data.title,
            description: data.description,
            cover: data.cover,
            body: blocks,
            category: data.category,
            tags: data.tags,
            id: Number(draftId),
          },
        },
        onCompleted: () => {
          setFormStatus(EditorFormStatus.SAVED);
        },
      });
    }
  }, [data, blocks, draftData, formStatus, createDraft, mode, setDraftId, setFormStatus, updateDraft, draftId]);

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
        isError={Boolean(isErrorCreateDraft) || Boolean(isErrorUpdateDraft)}
      />
    </div>
  );
};

export default EditorScreen;
