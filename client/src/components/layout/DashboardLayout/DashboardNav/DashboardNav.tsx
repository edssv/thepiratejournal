import { checkPermission } from '@/helpers/checkPermission';
import { useAuth } from '@/hooks';
import { dashboardNavData } from '@/lib/dashboardNavData';

import styles from './DashboardNav.module.scss';
import NavItem from './NavItem/NavItem';

const DashboardNav = () => {
  const { user } = useAuth();

  const havePermission = checkPermission(user?.role);

  return (
    <nav className={styles.root}>
      <div className='flex items-center gap-8'>
        {dashboardNavData.map((item) =>
          havePermission ? (
            <NavItem key={item.label} href={item.href} label={item.label} />
          ) : (
            item.label === 'Настройки' && <NavItem key={item.label} href={item.href} label={item.label} />
          )
        )}
      </div>
    </nav>
  );
};

export default DashboardNav;
