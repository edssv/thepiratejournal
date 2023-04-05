import { SearchHeader } from './SearchHeader/SearchHeader';
import ArticlesBlock from './ArticlesBlock/ArticlesBlock';

import styles from './Search.module.scss';

export default function SearchScreen() {
  return (
    <div className={styles.root}>
      <SearchHeader />
      <ArticlesBlock />
    </div>
  );
}
