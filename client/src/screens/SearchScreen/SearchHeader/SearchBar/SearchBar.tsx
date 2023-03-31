import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaPredicate } from 'react-media-hook';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import queryString from 'query-string';

import { useActions } from '@/hooks';
import { categoriesData } from '@/lib/categoriesData';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
    const { push, pathname, query } = useRouter();
    const { setCategory, setSort, setSearch, setTag, setQuery } = useActions();
    const { category, sort, search, tag } = useTypedSelector((state) => state.filter);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [inputValue, setInputValue] = useState(search);

    useEffect(() => {
        const parsed = queryString.parse(query.search as string);

        if (parsed.search !== (null || undefined)) {
            setInputValue(String(parsed?.search));
        }
    }, [query.search]);

    useEffect(() => {
        const sectionFromUrl = pathname.split('/')[2];
        const parsed = queryString.parse(query.search as string);

        setCategory(sectionFromUrl);
        setSort(parsed?.sort);
        setSearch(parsed?.search);
        setTag(parsed?.tag);
    }, [pathname, query.search, setCategory, setSearch, setSort, setTag]);

    useEffect(() => {
        const queryParams = {
            sort: sort,
            search: search,
            tag: tag,
        };
        const stringified = queryString.stringify(queryParams, { skipEmptyString: true });
        const decodeUrl = decodeURI(stringified);

        setQuery(decodeURI(decodeUrl));

        push(`/search${category ? `/${category}` : ''}${queryParams && `?${decodeUrl}`}`);
    }, [push, category, sort, search, tag, setQuery]);

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.options[e.target.selectedIndex].value;

        setCategory(selectValue);
    };

    const updateSearchValue = debounce((str: string) => {
        setSearch(str);
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
                                    onClick={() => setCategory(item.key)}
                                    className={clsx(category === item.key && styles.active, styles.tabItem)}
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
