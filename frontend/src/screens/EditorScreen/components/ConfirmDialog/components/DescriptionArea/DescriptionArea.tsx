import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks';
import { editorDataSelector, setDescription } from '@/store';

import styles from './DescriptionArea.module.scss';

export const DescriptionArea = () => {
    const dispatch = useAppDispatch();
    const { description } = useSelector(editorDataSelector);
    const [textareaValue, setTextareaValue] = useState(description);

    return (
        <div className={styles.root}>
            <textarea
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    setTextareaValue(e.currentTarget.value);
                    dispatch(setDescription(e.currentTarget.value));
                }}
                value={textareaValue}
                maxLength={203}
            />
        </div>
    );
};
