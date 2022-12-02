import React, { useEffect } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { FilterBar } from './FilterBar';
import { SearchBar } from './SearchBar';

import styles from './SearchHeader.module.scss';

interface SearchHeaderProps {
    selectCategory: string;
    setSelectCategory: React.Dispatch<React.SetStateAction<string>>;
    sortType: React.Key;
    setSortType: React.Dispatch<React.SetStateAction<React.Key>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setQueryParams: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
    selectCategory,
    setSelectCategory,
    sortType,
    setSortType,
    searchValue,
    setSearchValue,
    setQueryParams,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = {
            sort: sortType,
            search: searchValue,
        };
        const stringified = queryString.stringify(queryParams, { skipEmptyString: true });
        const decodeUrl = decodeURI(stringified);

        setQueryParams(decodeURI(decodeUrl));

        navigate(
            `/search${selectCategory && `/${selectCategory}`}${queryParams && `?${decodeUrl}`}`,
        );
    }, [navigate, selectCategory, sortType, searchValue, setQueryParams]);

    return (
        <div className={styles.root}>
            <SearchBar
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <FilterBar sortType={sortType} setSortType={setSortType} />
        </div>
    );
};
