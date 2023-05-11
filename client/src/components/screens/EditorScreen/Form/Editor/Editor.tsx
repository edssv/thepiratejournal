import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useFormContext } from 'react-hook-form';

import type { EditorForm } from '@/interfaces/editor-form.interface';
import { EditorFormStatus } from '@/lib/enums';

import type { EditorCore } from './EditorCore.interface';
import { i18n } from './i18n';
import { EDITOR_JS_TOOLS } from './tools';

interface EditorProps {
  setStatus: React.Dispatch<React.SetStateAction<EditorFormStatus>>;
}

const Editor: React.FC<EditorProps> = ({ setStatus }) => {
  const editorCore = useRef<any>(null);
  const { getValues, register, setValue } = useFormContext<EditorForm>();
  const blocks = getValues('body');

  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorCore) return;

    const savedData = await editorCore.current.save();

    setValue('body', savedData.blocks);
    setStatus(EditorFormStatus.MODIFIED);
  }, [setValue, setStatus]);

  return (
    <>
      <ReactEditorJS
        i18n={i18n}
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          blocks
        }}
        onChange={handleSave}
        onInitialize={handleInitialize}
      />
      <input
        className='full-hidden'
        type='text'
        {...register('body', { required: 'Тело статьи - обязательное поле.' })}
      />
    </>
  );
};

export default Editor;
