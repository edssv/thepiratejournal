import { useRouter } from 'next/navigation';

import FAB from '@/components/common/FAB/FAB';
import {
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel
} from '@/components/layout/Nav/NavRail/NavigationItem/NavigationItem';
import { navData } from '@/lib/navData';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './NavRail.module.scss';
import ThemeButton from './ThemeButton/ThemeButton';

const NavRail = () => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <FAB className={styles.fab} onClick={() => router.push(getPublicUrl.articleNew())}>
          <span className='material-symbols-outlined'>edit</span>
        </FAB>
        <nav aria-label='Main' className={styles.nav}>
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
