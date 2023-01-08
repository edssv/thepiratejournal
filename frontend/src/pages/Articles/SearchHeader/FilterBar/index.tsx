import React, { useState } from 'react';

import styles from './FilterBar.module.scss';
import { Listbox } from '@headlessui/react';

interface FilterBarProps {
    sortType: React.Key;
    setSortType: React.Dispatch<React.SetStateAction<React.Key>>;
}

const categories = [
    { name: 'Самые популярные', key: 'views' },
    { name: 'Самые новые', key: 'recent' },
    { name: 'Самые оцененные', key: 'appreciations' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ sortType, setSortType }) => {
    const [selectedCategory, setSelectedCategory] = useState(
        sortType === 'views'
            ? categories[0]
            : sortType === 'recent'
            ? categories[1]
            : sortType === 'appreciations'
            ? categories[2]
            : categories[0],
    );

    return (
        <div className={styles.root}>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="listBox">
                    <Listbox.Button placeholder="Выбери категорию" className="listBoxButton">
                        {selectedCategory.name}
                        <span className="material-symbols-outlined">unfold_more</span>
                    </Listbox.Button>
                    <Listbox.Options className="listBoxOptions">
                        {categories.map((category) => (
                            <Listbox.Option
                                className="listBoxOption"
                                onClick={() => setSortType(category.key)}
                                key={category.key}
                                value={category}>
                                {({ active, selected }) => (
                                    <div
                                        className={`${selected && 'selected'}
                                    optionContent
                                    `}>
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
        </div>
    );
};
