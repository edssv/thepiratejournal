import { FilterBar } from './FilterBar/FilterBar';
import { SearchBar } from './SearchBar/SearchBar';
import styles from './SearchHeader.module.scss';

export const SearchHeader: React.FC = () => (
  <div className={styles.root}>
    <SearchBar />
    <FilterBar />
  </div>
);
