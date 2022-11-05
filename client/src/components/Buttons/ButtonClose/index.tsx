import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonClose.module.scss';

export const ButtonClose: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className={styles.root}>
            <svg
                className={styles.closeIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                viewBox="0 0 26 26"
                id="i-close"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2">
                <path d="M2 24 L24 2 M24 24 L2 2" />
            </svg>
        </button>
    );
};
