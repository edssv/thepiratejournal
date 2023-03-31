import { useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './DescriptionArea.module.scss';

export const DescriptionArea = () => {
    const { setDescription } = useActions();
    const { description } = useTypedSelector((state) => state.editorPage.data);
    const [textareaValue, setTextareaValue] = useState(description);

    return (
        <div className={styles.root}>
            <textarea
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    setTextareaValue(e.currentTarget.value);
                    setDescription(e.currentTarget.value);
                }}
                value={textareaValue}
                maxLength={203}
            />
        </div>
    );
};
