import Image from 'next/image';

import avatar from '../../assets/img/avatar-material.png';

import styles from './Avatar.module.scss';

interface AvatarProps {
  imageSrc?: string | undefined | null;
  width?: number;
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc, width = 32 }) => (
  <div className={styles.root} style={{ width, height: width }}>
    <Image alt='Аватар' height={width} referrerPolicy='no-referrer' src={imageSrc ?? avatar.src} width={width} />
  </div>
);

export default Avatar;
