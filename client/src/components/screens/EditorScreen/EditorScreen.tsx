import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateDraftMutation, useUpdateDraftMutation } from '@/gql/__generated__';
import type { EditorForm } from '@/interfaces/editor-form.interface';
import { EditorPageMode, EditorFormStatus } from '@/lib/enums';

import Bar from './Bar/Bar';
import styles from './EditorScreen.module.scss';
import Form from './Form/Form';

interface EditorScreenProps {
  article?: Omit<EditorForm, 'draftId'>;
  mode: EditorPageMode;
}

const EditorScreen: React.FC<EditorScreenProps> = ({ article, mode }) => {
  const methods = useForm<EditorForm>({
    defaultValues: article || { cover: '' }
  });
  const [status, setStatus] = useState(EditorFormStatus.UNCHANGED);

  const [createDraft, { error: isErrorCreateDraft, loading: isLoadingCreatDraft }] = useCreateDraftMutation();
  const [updateDraft, { error: isErrorUpdateDraft, loading: isLoadingUpdateDraft }] = useUpdateDraftMutation();

  useEffect(() => {
    if (mode === EditorPageMode.EDIT) return;
    if (status === EditorFormStatus.SAVED || status === EditorFormStatus.UNCHANGED) return;

    const values = methods.getValues();

    if (!values.draftId) {
      createDraft({
        variables: { createDraftInput: values },
        onCompleted: ({ createDraft }) => {
          methods.setValue('draftId', +createDraft.id);
          setStatus(EditorFormStatus.SAVED);
        }
      });
      return;
    }

    if (values.draftId) {
      updateDraft({
        variables: { updateDraftInput: values },
        onCompleted: () => {
          setStatus(EditorFormStatus.SAVED);
        }
      });
    }
  }, [status, methods, createDraft, updateDraft, setStatus, mode]);

  return (
    <div className={styles.root}>
      <FormProvider {...methods}>
        <article className={styles.article}>
          <Form setStatus={setStatus} />
        </article>
        <Bar
          isError={Boolean(isErrorCreateDraft) || Boolean(isErrorUpdateDraft)}
          isLoading={isLoadingCreatDraft || isLoadingUpdateDraft}
          mode={mode}
          status={status}
        />
      </FormProvider>
    </div>
  );
};

export default EditorScreen;
