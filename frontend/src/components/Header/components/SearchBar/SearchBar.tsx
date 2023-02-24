import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks';
import { setSearch } from '../../../../redux';

import styles from './SearchBar.module.scss';

export const SearchBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={styles.root}>
            <form className={styles.form}>
                <span className={`${styles.icon} material-symbols-outlined`}>search</span>
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            navigate(`search?search=${inputValue}`);
                        }
                    }}
                    value={inputValue}
                    onChange={(e) => {
                        dispatch(setSearch(inputValue));
                        setInputValue(e.target.value);
                    }}
                    type="text"
                    placeholder="Поиск"
                />
                <button onClick={() => setInputValue('')} className={inputValue ? styles.visible : ''} type="button">
                    <span className={`${styles.trailingIcon} material-symbols-outlined`}>close</span>
                </button>
            </form>
        </div>
    );
};
