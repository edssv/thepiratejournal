import { useSelector } from 'react-redux';

import { selectArticle, setTags } from '../../../../../../redux';
import { useAppDispatch } from '../../../../../../hooks';

import styles from './TagsInput.module.scss';

export const TagsInput = () => {
    const dispatch = useAppDispatch();
    const article = useSelector(selectArticle);

    const removeTags = (indexToRemove: number) => {
        dispatch(setTags([...article?.tags.filter((_, index) => index !== indexToRemove)]));
    };
    const addTags = (event: any) => {
        if (event.target.value !== '') {
            dispatch(setTags([...article?.tags, event.target.value]));
            event.target.value = '';
        }
    };
    return (
        <div className={styles.root}>
            <div className={styles.tagsInput}>
                <ul className={styles.tagsList}>
                    {article?.tags?.map((tag, index) => (
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
