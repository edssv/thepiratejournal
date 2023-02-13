import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import debounce from 'lodash.debounce';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
    selectCategory: string;
    setSelectCategory: React.Dispatch<React.SetStateAction<string>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    selectCategory,
    setSelectCategory,
    searchValue,
    setSearchValue,
}) => {
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const [value, setValue] = React.useState<string>(searchValue);

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.options[e.target.selectedIndex].value;
        setSelectCategory(selectValue);
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            setSearchValue(str);
        }, 150),
        []
    );

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <div className={styles.root}>
            <div className={styles.searchWrap}>
                <div className={styles.inputWrap}>
                    <span className="material-symbols-outlined">search</span>
                    <form action="/search/articles">
                        <input
                            type="search"
                            value={value}
                            onChange={onChangeInput}
                            placeholder="Что хочешь почитать?"
                            className={styles.searchInput}
                        />
                    </form>
                </div>
                {isTablet ? (
                    <div className={styles.tabTrigger}>
                        <select onChange={onChangeSelect} name="" id="">
                            <option value="">Все статьи</option>
                            <option value="reviews">Обзоры</option>
                            <option value="solutions">Прохождения</option>
                            <option value="mentions">Отзывы</option>
                        </select>
                    </div>
                ) : (
                    <nav className={styles.tabNavigation}>
                        <ul className={styles.tabList}>
                            <li className={styles.tabItem}>
                                <Link
                                    to="/search"
                                    onClick={() => setSelectCategory('')}
                                    className={`${selectCategory === '' ? styles.active : ''} ${styles.tabLink}`}
                                >
                                    Все статьи
                                </Link>
                            </li>
                            <li className={styles.tabItem}>
                                <Link
                                    to="/search/reviews"
                                    onClick={() => setSelectCategory('reviews')}
                                    className={`${selectCategory === 'reviews' ? styles.active : ''} ${styles.tabLink}`}
                                >
                                    Обзоры
                                </Link>
                            </li>
                            <li className={styles.tabItem}>
                                <Link
                                    to="/search/solutions"
                                    onClick={() => setSelectCategory('solutions')}
                                    className={`${selectCategory === 'solutions' ? styles.active : ''} ${
                                        styles.tabLink
                                    }`}
                                >
                                    Прохождения
                                </Link>
                            </li>
                            <li className={styles.tabItem}>
                                <Link
                                    to="/search/mentions"
                                    onClick={() => setSelectCategory('mentions')}
                                    className={`${selectCategory === 'mentions' ? styles.active : ''} ${
                                        styles.tabLink
                                    }`}
                                >
                                    Отзывы
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};
