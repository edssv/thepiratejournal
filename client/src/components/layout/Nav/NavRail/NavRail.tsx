import { useRouter } from 'next/navigation';

import { navData } from '@/lib/navData';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import FAB from '@/components/common/FAB/FAB';
import { NavigationItem, NavigationItemIcon, NavigationItemLabel } from '@/components/NavigationItem/NavigationItem';
import ThemeButton from './ThemeButton/ThemeButton';

import styles from './NavRail.module.scss';

const NavRail = () => {
  const { push } = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <FAB onClick={() => push(getPublicUrl.articleNew())} className={styles.fab}>
          <span className="material-symbols-outlined">edit</span>
        </FAB>
        <nav className={styles.nav} aria-label="Main">
          {navData.map((item, i) => (
            <NavigationItem key={i} href={item.link}>
              <NavigationItemIcon>{item.icon}</NavigationItemIcon>
              <NavigationItemLabel>{item.label}</NavigationItemLabel>
            </NavigationItem>
          ))}
        </nav>
      </div>
      <ThemeButton />
    </div>
  );
};

export default NavRail;
