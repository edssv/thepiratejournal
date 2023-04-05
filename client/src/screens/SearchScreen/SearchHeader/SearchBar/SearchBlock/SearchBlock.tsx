import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import queryString from 'query-string';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks';

import styles from './SearchBlock.module.scss';

const SearchBlock = () => {
  const { query } = useRouter();

  const { category, sort, search, tag } = useTypedSelector((state) => state.filter);
  const [inputValue, setInputValue] = useState(search);

  const { setSearch } = useActions();

  // useEffect(() => {
  //   const parsed = queryString.parse(query.search as string);

  //   if (parsed.search !== (null || undefined)) {
  //     setInputValue(String(parsed?.search));
  //   }
  // }, [query.search]);

  const updateSearchValue = useCallback(
    debounce((search: string) => setSearch(search), 300),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  return (
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
  );
};

export default SearchBlock;
