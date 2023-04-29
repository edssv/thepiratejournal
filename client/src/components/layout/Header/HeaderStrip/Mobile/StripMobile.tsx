import Link from 'next/link';

import Button from '@/components/common/Button/Button';
import { useActions } from '@/hooks';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './StripMobile.module.scss';

const StripMobile = () => {
  const { setIsOpenHamburgerMenu } = useActions();

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Button icon color='secondary' onClick={() => setIsOpenHamburgerMenu(true)}>
          <span className='material-symbols-outlined'>menu</span>
        </Button>
        <Link className={`${styles.logo} icon-center`} href={getPublicUrl.home()}>
          <svg fill='none' height='40' viewBox='0 0 50 201' width='50' xmlns='http://www.w3.org/2000/svg'>
            <rect
              fill='var(--md-sys-color-primary)'
              height='129.8'
              rx='36.0997'
              transform='rotate(30 0 0)'
              width='72.1994'
              x='0'
              y='32'
            />
            <rect
              fill='var(--md-sys-color-primary)'
              height='72.1995'
              rx='36.0997'
              transform='rotate(45 75 24.25)'
              width='72.1994'
              x='64'
              y='32'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default StripMobile;
