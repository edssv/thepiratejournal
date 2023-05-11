import Image from 'next/image';

import styles from './Hero.module.scss';

const Hero: React.FC<{ cover: string }> = ({ cover }) => (
  <div className={styles.root}>
    <figure>
      <div className={styles.coverContainer}>
        <Image
          priority
          alt='Обложка'
          className={styles.articleCover}
          height={200}
          sizes='100vw'
          src={cover}
          style={{ width: '100%', height: '100%' }}
          width={200}
        />
      </div>
    </figure>
  </div>
);

export default Hero;
