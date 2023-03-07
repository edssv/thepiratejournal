import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useOnClickOutside } from '../../../../hooks';
import { setSearch } from '../../../../redux';
import { Button } from '../../../Buttons';

import styles from './SearchBar.module.scss';

export const SearchBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const rootRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        rootRef?.current?.classList.add(styles.focus);
    };

    useOnClickOutside(rootRef, () => rootRef?.current?.classList.remove(styles.focus));

    return (
        <div ref={rootRef} onMouseDown={handleClick} className={styles.root}>
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
                <Button
                    onClick={() => setInputValue('')}
                    className={inputValue ? styles.visible : ''}
                    icon
                    type="button"
                >
                    <span className={`${styles.trailingIcon} material-symbols-outlined`}>close</span>
                </Button>
            </form>
        </div>
    );
};
