import clsx from 'clsx';
import { useMediaPredicate } from 'react-media-hook';

import { categoriesData } from '@/lib/categoriesData';
import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './TabList.module.scss';

const TabList = () => {
  const { category } = useTypedSelector((state) => state.filter);

  const { setCategory } = useActions();

  const isTablet = useMediaPredicate('(max-width: 990.98px)');

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.options[e.target.selectedIndex].value;

    setCategory(selectValue);
  };
  return isTablet ? (
    <div className={styles.tabTrigger}>
      <select onChange={onChangeSelect} name="" id="">
        {categoriesData.map((item, i) => (
          <option key={i} value={item.key}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <nav className={styles.tabNavigation}>
      <ul className={styles.tabList}>
        {categoriesData.map((item, i) => (
          <li
            key={i}
            onClick={() => setCategory(item.key)}
            className={clsx(category === item.key && styles.active, styles.tabItem)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabList;
