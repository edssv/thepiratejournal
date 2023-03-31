import React from 'react';

import { FilterBar } from './FilterBar/FilterBar';
import { SearchBar } from './SearchBar/SearchBar';

import styles from './SearchHeader.module.scss';

export const SearchHeader: React.FC = ({}) => {
    return (
        <div className={styles.root}>
            <SearchBar />
            <FilterBar />
        </div>
    );
};
