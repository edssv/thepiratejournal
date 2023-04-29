import { useMediaPredicate } from 'react-media-hook';

import { useActions } from '@/hooks';
import { categoriesData } from '@/lib/categoriesData';

import styles from './TabList.module.scss';

const TabList = () => {
  const { setCategory } = useActions();

  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.options[e.target.selectedIndex].value;

    setCategory(selectValue);
  };

  return isTablet ? (
    <div className={styles.tabTrigger}>
      <select id='' name='' onChange={onChangeSelect}>
        {categoriesData.map((item, i) => (
          <option key={i} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <nav className={styles.tabNavigation}>
      {/* <ul className={styles.tabList}>
        {categoriesData.map((item, i) => (
          <li
            key={i}
            className={clsx(category === item.key && styles.active, styles.tabItem)}
            onClick={() => setCategory(item.key)}
            onKeyDown={() => {}}
          >
            {item.name}
          </li>
        ))}
      </ul> */}
    </nav>
  );
};

export default TabList;
