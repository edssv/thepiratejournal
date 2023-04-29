import type { ArticlePageMode } from '@/lib/enums';

import { ShareButtons } from '../ShareButtons/ShareButtons';

import styles from './Header.module.scss';

interface HeaderProps {
  id: string;
  title: string;
  description: string;
  mode: ArticlePageMode;
}

const Header: React.FC<HeaderProps> = ({ id, title, description, mode }) => (
  <header className={styles.root}>
    <div className={styles.content}>
      <h1 className={styles.articleHeadline}>{title}</h1>
      <div className={styles.subHeader}>
        <p className={styles.description}>{description}</p>
        <div className={styles.shareButtonsWrap}>
          <ShareButtons articleId={id} mode={mode} title={title} />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
