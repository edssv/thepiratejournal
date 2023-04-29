import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import type { Block } from '@/gql/__generated__';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import type { EditorCore } from './EditorCore.interface';
import { i18n } from './i18n';
import { EDITOR_JS_TOOLS } from './tools';

interface EditorProps {
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const EditorJS: React.FC<EditorProps> = ({ setBlocks }) => {
  const editorCore = useRef<any>(null);
  const ReactEditorJS = createReactEditorJS();

  const { data } = useTypedSelector((state) => state.editorPage);

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorCore.current.save) return;

    const savedData = await editorCore.current.save();

    setBlocks(savedData.blocks);
  }, [setBlocks]);

  return (
    <ReactEditorJS
      i18n={i18n}
      tools={EDITOR_JS_TOOLS}
      defaultValue={{
        blocks: data?.body ?? []
      }}
      onChange={handleSave}
      onInitialize={handleInitialize}
    />
  );
};

export default EditorJS;
