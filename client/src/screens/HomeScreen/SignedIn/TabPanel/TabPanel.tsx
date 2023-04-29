import Link from 'next/link';

import { useAuth } from '@/hooks';

import { HomeSection } from '../SignedIn';

import styles from './TabPanel.module.scss';

interface TabPanelProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<HomeSection>>;
}

export const TabPanel: React.FC<TabPanelProps> = ({ activeSection, setActiveSection }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <div className={styles.root}>
      <section className='articles'>
        <div className={styles.navRailContainer}>
          <nav className={styles.navRail}>
            <Link
              href='/for_you'
              className={`${styles.sectionLink} ${
                activeSection === HomeSection.ForYou ? styles.active : ''
              }`}
              onClick={() => setActiveSection(HomeSection.ForYou)}
            >
              <span className={`${styles.icon} material-symbols-outlined`}>explore</span>
              <div className={styles.label}>Обзор</div>
            </Link>

            {user && (
              <Link
                href='/following'
                className={`${styles.sectionLink} ${
                  activeSection === HomeSection.Following ? styles.active : ''
                }`}
                onClick={() => setActiveSection(HomeSection.Following)}
              >
                <span className={`${styles.icon} material-symbols-outlined`}>group</span>
                <div className={styles.label}>Подписки</div>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
};
