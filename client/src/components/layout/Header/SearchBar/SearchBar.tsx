import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import Button from '@/components/common/Button/Button';
import { useActions, useOnClickOutside } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const router = useRouter();
  const { setSearch } = useActions();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    rootRef?.current?.classList.add(styles.focus);
  };

  useOnClickOutside(rootRef, () => rootRef?.current?.classList.remove(styles.focus));

  return (
    <div ref={rootRef} aria-hidden='true' className={styles.root} onMouseDown={handleClick}>
      <form className={styles.form}>
        <span className={`${styles.icon} material-symbols-outlined`}>search</span>
        <input
          placeholder='Поиск'
          type='text'
          value={inputValue}
          onChange={(e) => {
            setSearch(inputValue);
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              router.push(getPublicUrl.search(`search=${inputValue}`));
            }
          }}
        />
        <Button icon className={inputValue ? styles.visible : ''} type='button' onClick={() => setInputValue('')}>
          <span className={`${styles.trailingIcon} material-symbols-outlined`}>close</span>
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
