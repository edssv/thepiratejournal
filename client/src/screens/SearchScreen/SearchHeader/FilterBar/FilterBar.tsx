import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';

import { useGetTags } from '@/services';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { sortData } from '@/lib/sortData';
import { useActions } from '@/hooks';
import Chip from '@/components/common/Chip/Chip';

import styles from './FilterBar.module.scss';

export const FilterBar: React.FC = () => {
    const { data } = useGetTags();
    const { setTag, setSort } = useActions();
    const { sort, tag } = useTypedSelector((state) => state.filter);
    const [selectedCategory, setSelectedCategory] = useState(
        sort === 'views'
            ? sortData[0]
            : sort === 'recent'
            ? sortData[1]
            : sort === 'appreciations'
            ? sortData[2]
            : sortData[0]
    );

    return (
        <div className={styles.root}>
            <div className={styles.tags}>
                {data?.map((item: string, i: number) => (
                    <Chip key={i} onClick={() => setTag(item)} selected={item === tag}>
                        {item}
                    </Chip>
                ))}
            </div>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="listBox">
                    <Listbox.Button placeholder="Выбери категорию" className="listBoxButton">
                        {selectedCategory.name}
                        <span className="material-symbols-outlined">unfold_more</span>
                    </Listbox.Button>
                    <Listbox.Options className="listBoxOptions">
                        {sortData.map((item) => (
                            <Listbox.Option
                                className="listBoxOption"
                                onClick={() => setSort(item.key)}
                                key={item.key}
                                value={item}
                            >
                                {({ active, selected }) => (
                                    <div
                                        className={`${selected && 'selected'}
                                    optionContent
                                    `}
                                    >
                                        {selected && <span className="material-symbols-outlined">check</span>}{' '}
                                        {item.name}
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
