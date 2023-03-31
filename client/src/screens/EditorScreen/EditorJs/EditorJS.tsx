import { useCallback, useEffect, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import debounce from 'lodash.debounce';

import { EDITOR_JS_TOOLS } from './tools';
import { i18n } from './i18n';
import { Block } from '@/interfaces/block.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EditorCore } from './EditorCore.interface';

const EditorJS: React.FC<{ setBlocks: React.Dispatch<React.SetStateAction<Block[]>> }> = ({ setBlocks }) => {
    const { data } = useTypedSelector((state) => state.editorPage);

    const editorCore = useRef<any>(null);
    const ReactEditorJS = createReactEditorJS();

    const handleInitialize = useCallback((instance: EditorCore) => {
        editorCore.current = instance;
    }, []);

    const handleSave = useCallback(async () => {
        if (!editorCore.current.save) return;

        const savedData = await editorCore.current.save();

        setBlocks(savedData.blocks);
    }, [setBlocks]);

    // const autoSave = useCallback(
    //     debounce(async () => {
    //         const savedData = await handleSave();
    //         console.log(savedData);
    //         setBlocks(savedData);

    //         // const formData = Object.assign({ intent: 'draft' }, article, blocks);
    //         // saveArticle(formData);
    //     }, 150),
    //     []
    // );

    // if (mode !== 'new' && !data.body) return null;

    return (
        <ReactEditorJS
            onInitialize={handleInitialize}
            placeholder="Давай напишем классную статью!"
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
