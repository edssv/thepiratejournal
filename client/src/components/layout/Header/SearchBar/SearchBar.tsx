import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useActions, useOnClickOutside } from '@/hooks';
import Button from '@/components/common/Button/Button';

import styles from './SearchBar.module.scss';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

const SearchBar = () => {
  const { push } = useRouter();
  const { setSearch } = useActions();
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
              push(getPublicUrl.search(`search=${inputValue}`));
            }
          }}
          value={inputValue}
          onChange={(e) => {
            setSearch(inputValue);
            setInputValue(e.target.value);
          }}
          type="text"
          placeholder="Поиск"
        />
        <Button onClick={() => setInputValue('')} className={inputValue ? styles.visible : ''} icon type="button">
          <span className={`${styles.trailingIcon} material-symbols-outlined`}>close</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
