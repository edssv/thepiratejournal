import { Article } from '@/interfaces/article.interface';

import styles from './Hero.module.scss';

const Hero: React.FC<{ data: Partial<Article> }> = ({ data }) => {
  return (
    <div className={styles.root}>
      <figure>
        <div className={styles.coverContainer}>
          <img src={data?.cover ?? ''} className={styles.articleCover} alt="Обложка" />
        </div>
      </figure>
    </div>
  );
};

export default Hero;
