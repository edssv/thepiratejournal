import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { useAppDispatch, useArticle } from '../../../../hooks';
import { setArticleCategory } from '../../../../redux';

import styles from './ListBox.module.scss';

const categories = [
    { name: 'Обзоры', key: 'reviews' },
    { name: 'Прохождения', key: 'solutions' },
    { name: 'Отзывы', key: 'mentions' },
];

export const ListBoxPicker = () => {
    const dispatch = useAppDispatch();
    const { mutableArticle } = useArticle();

    const [selectedCategory, setSelectedCategory] = useState(mutableArticle?.category || {});

    console.log(selectedCategory);

    return (
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className={styles.root}>
                <Listbox.Button placeholder="Выбери категорию" className={styles.listBoxButton}>
                    {selectedCategory.name}{' '}
                    <span className="material-symbols-outlined">unfold_more</span>
                </Listbox.Button>
                <Listbox.Options className={styles.listBoxOptions}>
                    {categories.map((category) => (
                        <Listbox.Option
                            className={styles.listBoxOption}
                            onClick={() => dispatch(setArticleCategory(category))}
                            key={category.key}
                            value={category}>
                            {({ active, selected }) => (
                                <div
                                    className={`${selected && styles.selected} ${
                                        styles.optionContent
                                    }`}>
                                    {selected && (
                                        <span className="material-symbols-outlined">check</span>
                                    )}{' '}
                                    {category.name}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
};
