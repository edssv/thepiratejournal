import { ArticlePageMode } from '@/lib/enums';
import { Article } from '@/interfaces/article.interface';
import { ShareButtons } from '../ShareButtons/ShareButtons';

import styles from './Header.module.scss';

interface HeaderProps {
  data: Partial<Article>;
  mode: ArticlePageMode;
}

const Header: React.FC<HeaderProps> = ({ data, mode }) => {
  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.articleHeadline}>{data?.title}</h1>
        <div className={styles.subHeader}>
          <p className={styles.description}>{data?.description}</p>
          <div className={styles.shareButtonsWrap}>
            <ShareButtons mode={mode} title={data.title ?? ''} articleId={String(data.id)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
