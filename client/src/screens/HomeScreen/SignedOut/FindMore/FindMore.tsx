import Link from 'next/link';
import clsx from 'clsx';

import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './FindMore.module.scss';

export const FindMore = () => {
  return (
    <section className={clsx(styles.root, 'homeSection')}>
      <div className="contentContainer">
        <div className="sectionHeader">
          <h2>Смотреть больше</h2>
          <p className={styles.headerDescription}>Больше статей ты сможешь найти в разделе – Поиск</p>
        </div>
        <Link href={getPublicUrl.search()} className={styles.card}>
          <div className={styles.contentContainer}>
            <span className={styles.title}>Поиск</span>
            <span className={styles.description}>
              Находи статьи, которые тебе по вкусу. Используя сортировку, фильтрацию и прочие возможности поиска.
            </span>
          </div>
          <div className={styles.iconBadge}>
            <div className={styles.mask}>
              <svg
                _ngcontent-igu-c38=""
                width="100%"
                height="100%"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  _ngcontent-igu-c38=""
                  d="M.887 14.467C-2.845 5.875 5.875-2.845 14.467.887l1.42.617a10.323 10.323 0 0 0 8.225 0l1.42-.617c8.593-3.732 17.313 4.988 13.581 13.58l-.617 1.42a10.323 10.323 0 0 0 0 8.225l.617 1.42c3.732 8.593-4.989 17.313-13.58 13.581l-1.42-.617a10.323 10.323 0 0 0-8.225 0l-1.42.617C5.874 42.845-2.846 34.125.886 25.533l.617-1.42a10.323 10.323 0 0 0 0-8.225l-.617-1.42Z"
                  fill="#D3E3FD"
                ></path>
              </svg>
            </div>
            <span className={clsx(styles.symbol, 'material-symbols-outlined')}>search</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
