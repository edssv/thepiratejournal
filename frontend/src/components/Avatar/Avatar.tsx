import React from 'react';

import avatar from '../../assets/img/avatar-material.png';
import styles from './Avatar.module.scss';

interface AvatarProps {
    imageSrc?: string;
    width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ imageSrc, width = 32 }) => {
    return (
        <div className={styles.root} style={{ width: width, height: width }}>
            <img
                src={imageSrc ?? avatar}
                alt="Аватар"
                style={{ width: width, height: width }}
                referrerPolicy="no-referrer"
            />
        </div>
    );
};
