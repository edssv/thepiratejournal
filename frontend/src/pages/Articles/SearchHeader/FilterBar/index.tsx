import React from 'react';
import { Item, Picker } from '@adobe/react-spectrum';

import styles from './FilterBar.module.scss';

interface FilterBarProps {
    sortType: React.Key;
    setSortType: React.Dispatch<React.SetStateAction<React.Key>>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ sortType, setSortType }) => {
    return (
        <div className={styles.root}>
            <Picker
                label="Сортировать"
                placeholder="Самые популярные"
                selectedKey={sortType}
                onSelectionChange={(selected) => setSortType(selected)}
                height="48px"
                labelAlign="end">
                <Item key="views">Самые популярные</Item>
                <Item key="recent">Самые новые</Item>
                <Item key="appreciations">Самые оцененные</Item>
            </Picker>
        </div>
    );
};
