import { useCallback, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import { BlockType } from '@/gql/__generated__';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EDITOR_JS_TOOLS } from './tools';
import { i18n } from './i18n';
import { EditorCore } from './EditorCore.interface';

interface EditorProps {
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
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
      onInitialize={handleInitialize}
      defaultValue={{
        blocks: data?.body ?? [],
      }}
      onChange={handleSave}
      tools={EDITOR_JS_TOOLS}
      i18n={i18n}
    />
  );
};

export default EditorJS;
