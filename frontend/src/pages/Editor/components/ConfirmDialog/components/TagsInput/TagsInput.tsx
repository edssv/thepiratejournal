import { useSelector } from 'react-redux';

import { editorDataSelector, selectArticle, setTags } from '../../../../../../redux';
import { useAppDispatch } from '../../../../../../hooks';

import styles from './TagsInput.module.scss';

export const TagsInput = () => {
    const dispatch = useAppDispatch();
    const data = useSelector(editorDataSelector);

    const removeTags = (indexToRemove: number) => {
        if (data.tags) {
            dispatch(setTags([...data?.tags.filter((_, index) => index !== indexToRemove)]));
        }
    };

    const addTags = (event: any) => {
        if (event.target.value !== '') {
            dispatch(setTags([...(data?.tags ?? []), event.target.value]));
            event.target.value = '';
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.tagsInput}>
                <ul className={styles.tagsList}>
                    {data?.tags?.map((tag, index) => (
                        <li key={index} className={styles.tag}>
                            <span className={styles.tagTitle}>{tag}</span>
                            <button className={styles.tagCloseButton} onClick={() => removeTags(index)}>
                                <span className="material-symbols-outlined">cancel</span>
                            </button>
                        </li>
                    ))}
                </ul>

                <input
                    type="text"
                    onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
                    placeholder="Добавь теги"
                />
            </div>
        </div>
    );
};
