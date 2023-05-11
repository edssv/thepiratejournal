import Image from 'next/image';

import avatar from '../../assets/img/avatar-material.png';

import styles from './Avatar.module.scss';

interface AvatarProps {
  imageSrc?: string | undefined | null;
  width?: number;
  sizes?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc, sizes, width = 32 }) => (
  <div className={styles.root} style={{ width, height: width }}>
    <Image alt='Аватар' height={width} sizes={sizes || '10vw'} src={imageSrc ?? avatar.src} width={width} />
  </div>
);

export default Avatar;
