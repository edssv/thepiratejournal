import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useActions } from '@/hooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Button from '@/components/common/Button/Button';
import SearchBar from '../../SearchBar/SearchBar';
import LogoBlock from './LogoBlock/LogoBlock';

import styles from './StripDesktop.module.scss';

const UserControls = dynamic(() => import('./UserControls/UserControls'), { ssr: false });

const StripDesktop = () => {
  const { pathname } = useRouter();
  const isSearchLocation = pathname.split('/')[1] === 'search';

  const isOpenNavRail = useTypedSelector((state) => state.ui.isOpenNavRail);

  const { setIsOpenNavRail } = useActions();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.navRailOpenContainer}>
          <Button className={styles.navRailOpen} onClick={() => setIsOpenNavRail(!isOpenNavRail)}>
            <span className="material-symbols-outlined">{isOpenNavRail ? 'menu_open' : 'menu'}</span>
          </Button>
        </div>
        <LogoBlock />
        {!isSearchLocation && <SearchBar />}
      </div>
      <UserControls />
    </div>
  );
};

export default StripDesktop;
