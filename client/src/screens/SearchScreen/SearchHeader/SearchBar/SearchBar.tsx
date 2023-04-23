import { useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import { useActions } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import TabList from './TabList/TabList';
import SearchBlock from './SearchBlock/SearchBlock';

import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const { push, query } = useRouter();

  const { category, sort, search, tag } = useTypedSelector((state) => state.filter);

  const { setCategory, setSort, setSearch, setTag, setQuery } = useActions();

  useEffect(() => {
    const { category, sort, search, tag } = query;

    setCategory(category);
    setSort(sort);
    setSearch(search);
    setTag(tag);
  }, [query, setCategory, search, setQuery, setSort, setTag, setSearch]);

  useEffect(() => {
    const queryParams = {
      category: category,
      sort: sort,
      search: search,
      tag: tag,
    };
    const stringified = queryString.stringify(queryParams, { skipEmptyString: true });
    const decodeUrl = decodeURI(stringified);

    setQuery(decodeURI(decodeUrl));

    push(getPublicUrl.search(decodeUrl));
  }, [category, sort, tag, search, setQuery, push]);

  return (
    <div className={styles.root}>
      <div className={styles.searchWrap}>
        <SearchBlock />
        <TabList />
      </div>
    </div>
  );
};
