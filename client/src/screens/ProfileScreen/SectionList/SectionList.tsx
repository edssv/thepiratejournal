import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { profileNavData } from '@/lib/profileNavData';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './SectionList.module.scss';

const SectionList: React.FC<{ isOwner: boolean; currentSection: string }> = ({ isOwner, currentSection }) => {
  const { asPath } = useRouter();

  const navListItems = profileNavData.map((item, i) => (
    <li key={i}>
      <Link
        className={clsx(styles.tabItem, currentSection === item.category && styles.active)}
        href={getPublicUrl.profileWithCategory(asPath.split('/')[3], item.category)}
      >
        <span className={styles.tabLabel}>
          <span className='material-symbols-outlined'>{item.icon}</span>
          {item.text}
        </span>
      </Link>
    </li>
  ));

  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.tabList}>{isOwner ? navListItems : [navListItems[0], navListItems[1]]}</ul>
      </nav>
    </div>
  );
};

export default SectionList;
