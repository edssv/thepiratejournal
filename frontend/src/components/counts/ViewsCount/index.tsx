import React from 'react';

import styles from './ViewsCount.module.scss';

interface ArticlesCountProps {
    endpoint?: boolean;
    viewsCount?: number;
}

export const ViewsCount: React.FC<ArticlesCountProps> = ({ endpoint, viewsCount }) => {
    return (
        <div className={styles.root}>
            <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7 3.20833C5.87242 3.20833 4.95833 4.12242 4.95833 5.25C4.95833 6.37758 5.87242 7.29167 7 7.29167C8.12758 7.29167 9.04167 6.37758 9.04167 5.25C9.04167 4.12242 8.12758 3.20833 7 3.20833ZM7 0C3.13425 0 0 4.375 0 5.25C0 6.125 3.13425 10.5 7 10.5C10.8657 10.5 14 6.125 14 5.25C14 4.375 10.8657 0 7 0ZM7 8.45833C5.22783 8.45833 3.79167 7.02217 3.79167 5.25C3.79167 3.47783 5.22783 2.04167 7 2.04167C8.77217 2.04167 10.2083 3.47783 10.2083 5.25C10.2083 7.02217 8.77217 8.45833 7 8.45833Z"
                    fill="black"
                />
            </svg>
            <span>
                {viewsCount} {endpoint && 'просмотров'}
            </span>
        </div>
    );
};
