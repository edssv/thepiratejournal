import Image from 'next/image';

import styles from './Hero.module.scss';

const Hero: React.FC<{ cover: string }> = ({ cover }) => {
  return (
    <div className={styles.root}>
      <figure>
        <div className={styles.coverContainer}>
          <Image
            width={200}
            height={200}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
            priority
            src={cover}
            className={styles.articleCover}
            alt="Обложка"
          />
        </div>
      </figure>
    </div>
  );
};

export default Hero;
