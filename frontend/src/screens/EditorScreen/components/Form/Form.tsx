import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks';
import { Block, editorDataSelector, formStatusSelector, setFormStatus, setTitle } from '@/store';
import { EditorJS } from '../EditorJs';

import styles from './Form.module.scss';

interface FormProps {
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

export const Form: React.FC<FormProps> = ({ setBlocks }) => {
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);
    const formStatus = useSelector(formStatusSelector);

    useEffect(() => {
        const handler = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };

        if (formStatus === 'modified') {
            window.addEventListener('beforeunload', handler);

            return () => {
                window.removeEventListener('beforeunload', handler);
            };
        }

        return;
    }, [formStatus]);

    return (
        <form
            onChange={() => {
                if (data?.title) {
                    dispatch(setFormStatus('modified'));
                } else {
                    dispatch(setFormStatus('modified'));
                }
            }}
            className={styles.root}
        >
            <div className={styles.textareaWrapper}>
                <textarea
                    maxLength={68}
                    autoFocus={true}
                    placeholder="Дай мне имя"
                    className={styles.writingHeader}
                    value={data?.title ?? ''}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    style={{ height: 42 }}
                />
            </div>
            <EditorJS setBlocks={setBlocks} />
        </form>
    );
};
