import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaPredicate } from 'react-media-hook';
import debounce from 'lodash.debounce';
import queryString from 'query-string';

import { selectFilter, setCategory, setQuery, setSearch, setSort, setTag } from '@/store';
import { useAppDispatch } from '@/hooks';

import styles from './SearchBar.module.scss';

const categoriesData = [
    { name: 'Все статьи', key: '' },
    { name: 'Обзоры', key: 'reviews' },
    { name: 'Прохождения', key: 'solutions' },
    { name: 'Отзывы', key: 'mentions' },
];

export const SearchBar: React.FC = ({}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { category, sort, search, tag } = useSelector(selectFilter);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [inputValue, setInputValue] = React.useState(search);

    useEffect(() => {
        const parsed = queryString.parse(location.search);

        if (parsed.search !== (null || undefined)) {
            setInputValue(String(parsed?.search));
        }
    }, []);

    useEffect(() => {
        const sectionFromUrl = location.pathname.split('/')[2];
        const parsed = queryString.parse(location.search);

        dispatch(setCategory(sectionFromUrl));
        dispatch(setSort(parsed?.sort));
        dispatch(setSearch(parsed?.search));
        dispatch(setTag(parsed?.tag));
    }, [location]);

    useEffect(() => {
        const queryParams = {
            sort: sort,
            search: search,
            tag: tag,
        };
        const stringified = queryString.stringify(queryParams, { skipEmptyString: true });
        const decodeUrl = decodeURI(stringified);

        dispatch(setQuery(decodeURI(decodeUrl)));

        navigate(`/search${category ? `/${category}` : ''}${queryParams && `?${decodeUrl}`}`);
    }, [navigate, category, sort, search, tag]);

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.options[e.target.selectedIndex].value;

        dispatch(setCategory(selectValue));
    };

    const updateSearchValue = debounce((str: string) => {
        dispatch(setSearch(str));
    }, 150);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <div className={styles.root}>
            <div className={styles.searchWrap}>
                <div className={styles.inputWrap}>
                    <span className="material-symbols-outlined">search</span>
                    <form action="/search/articles">
                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                            value={inputValue}
                            onChange={onChangeInput}
                            className={styles.searchInput}
                            placeholder="Что хочешь почитать?"
                            type="search"
                        />
                    </form>
                </div>
                {isTablet ? (
                    <div className={styles.tabTrigger}>
                        <select onChange={onChangeSelect} name="" id="">
                            {categoriesData.map((item, i) => (
                                <option key={i} value={item.key}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <nav className={styles.tabNavigation}>
                        <ul className={styles.tabList}>
                            {categoriesData.map((item, i) => (
                                <li
                                    key={i}
                                    onClick={() => dispatch(setCategory(item.key))}
                                    className={`${category === item.key ? styles.active : ''} ${styles.tabItem}`}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};
