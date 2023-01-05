import { setTags } from '../../../redux';
import { useAppDispatch, useArticle } from '../../../hooks';

import { RiCloseCircleFill } from 'react-icons/ri';

import styles from './TagsInput.module.scss';

export const TagsInput = () => {
    const dispatch = useAppDispatch();
    const { mutableArticle } = useArticle();

    const removeTags = (indexToRemove: number) => {
        dispatch(setTags([...mutableArticle?.tags.filter((_, index) => index !== indexToRemove)]));
    };
    const addTags = (event: any) => {
        if (event.target.value !== '') {
            dispatch(setTags([...mutableArticle?.tags, event.target.value]));
            event.target.value = '';
        }
    };
    return (
        <div className={styles.root}>
            <span className={styles.label}>Теги</span>
            <div className={styles.tagsInput}>
                <ul className={styles.tagsList}>
                    {mutableArticle?.tags?.map((tag, index) => (
                        <li key={index} className={styles.tag}>
                            <span className={styles.tagTitle}>{tag}</span>
                            <RiCloseCircleFill
                                className={styles.tagCloseIcon}
                                onClick={() => removeTags(index)}
                            />
                        </li>
                    ))}
                </ul>

                <input
                    type="text"
                    onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
                    placeholder="Добавь теги..."
                />
            </div>
        </div>
    );
};
