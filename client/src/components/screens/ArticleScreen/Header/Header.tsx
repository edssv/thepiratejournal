import { ShareButtons } from '../ShareButtons/ShareButtons';

import styles from './Header.module.scss';

interface HeaderProps {
  id: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ description, id, title }) => (
  <header className={styles.root}>
    <div className={styles.content}>
      <h1 className={styles.articleHeadline}>{title}</h1>
      <div className={styles.subHeader}>
        <p className={styles.description}>{description}</p>
        <div className={styles.shareButtonsWrap}>
          <ShareButtons articleId={id} title={title} />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
