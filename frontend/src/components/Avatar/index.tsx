import React from 'react';
import avatar from '../../assets/img/avatar.png';

import styles from './Avatar.module.scss';

interface AvatarProps {
    imageSrc: string | undefined;
    width?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ imageSrc, width }) => {
    return (
        <div
            className={styles.root}
            style={width ? { width: width, height: width } : { width: 34, height: 34 }}>
            {
                <img
                    src={imageSrc ? imageSrc : avatar}
                    alt="Аватар"
                    style={width ? { width: width, height: width } : { width: 34, height: 34 }}
                />
            }
        </div>
    );
};
