import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './SearchBlock.module.scss';

const SearchBlock = () => {
  const { search } = useTypedSelector((state) => state.filter);
  const [inputValue, setInputValue] = useState(search);

  const { setSearch } = useActions();

  // useEffect(() => {
  //   const parsed = queryString.parse(query.search as string);

  //   if (parsed.search !== (null || undefined)) {
  //     setInputValue(String(parsed?.search));
  //   }
  // }, [query.search]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <span className='material-symbols-outlined'>search</span>
      <form action='/search/articles'>
        <input
          className={styles.searchInput}
          placeholder='Что хочешь почитать?'
          type='search'
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </form>
    </div>
  );
};

export default SearchBlock;
