import ArticlesBlock from './ArticlesBlock/ArticlesBlock';
import styles from './Search.module.scss';
import { SearchHeader } from './SearchHeader/SearchHeader';

const SearchScreen = () => (
  <div className={styles.root}>
    <SearchHeader />
    <ArticlesBlock />
  </div>
);

export default SearchScreen;
