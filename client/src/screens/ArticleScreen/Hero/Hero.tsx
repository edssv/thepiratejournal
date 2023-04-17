import styles from './Hero.module.scss';

const Hero: React.FC<{ cover: string }> = ({ cover }) => {
  return (
    <div className={styles.root}>
      <figure>
        <div className={styles.coverContainer}>
          <img src={cover} className={styles.articleCover} alt="Обложка" />
        </div>
      </figure>
    </div>
  );
};

export default Hero;
