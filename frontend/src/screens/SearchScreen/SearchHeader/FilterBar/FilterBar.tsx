import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { useSelector } from 'react-redux';

import { Chip } from '../../../../components';
import { selectFilter, setSort, setTag, useGetLastTagsQuery } from '@/store';
import { useAppDispatch } from '@/hooks';

import styles from './FilterBar.module.scss';

const sortData = [
    { name: 'Самые популярные', key: 'views' },
    { name: 'Самые новые', key: 'recent' },
    { name: 'Самые оцененные', key: 'appreciations' },
];

export const FilterBar: React.FC = () => {
    const { data } = useGetLastTagsQuery('');
    const dispatch = useAppDispatch();
    const { sort, tag } = useSelector(selectFilter);
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
                {data?.tags?.map((item, i: number) => (
                    <Chip key={i} onClick={() => dispatch(setTag(item))} selected={item === tag}>
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
                                onClick={() => dispatch(setSort(item.key))}
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
