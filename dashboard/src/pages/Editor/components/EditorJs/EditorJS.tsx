import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createReactEditorJS } from 'react-editor-js';
import debounce from 'lodash.debounce';

import { Block, editorDataSelector, modeSelector } from '../../../../redux';
import { EDITOR_JS_TOOLS } from './tools';
import { i18n } from './i18n';
import { Overlay } from '../../../../components';

interface EditorJSProps {
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export const EditorJS: React.FC<EditorJSProps> = ({ setBlocks }) => {
    const data = useSelector(editorDataSelector);
    const mode = useSelector(modeSelector);
    const editorCore = useRef<any>(null);
    const ReactEditorJS = createReactEditorJS();
    const handleInitialize = useCallback((instance: any) => {
        editorCore.current = instance;
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', autoSave);

        return () => {
            document.removeEventListener('keydown', autoSave);
        };
    }, []);

    const handleSave = useCallback(async () => {
        const savedData = await editorCore.current.save();
        return savedData;
    }, []);

    const autoSave = useCallback(
        debounce(async () => {
            const savedData = await handleSave();

            setBlocks(savedData);

            // const formData = Object.assign({ intent: 'draft' }, article, blocks);
            // saveArticle(formData);
        }, 150),
        []
    );

    if (mode !== 'new' && !data.blocks) return null;

    return (
        <ReactEditorJS
            onInitialize={handleInitialize}
            placeholder="Давай напишем классную статью!"
            defaultValue={{
                blocks: data?.blocks ?? [],
            }}
            tools={EDITOR_JS_TOOLS}
            i18n={i18n}
        />
    );
};
