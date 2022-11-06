import React from 'react';

import styles from './ArticlesCount.module.scss';

interface ArticlesCountProps {
    endpoint?: boolean;
    count?: number;
}

export const ArticlesCount: React.FC<ArticlesCountProps> = ({ endpoint, count }) => {
    return (
        <div className={styles.root}>
            <svg width="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 2.16667V11.5C1 12.1444 1.52233 12.6667 2.16667 12.6667H9.16667C9.81102 12.6667 10.3333 12.1444 10.3333 11.5V4.69928C10.3333 4.38532 10.2068 4.0846 9.98228 3.86511L7.39211 1.33249C7.17412 1.11934 6.8814 1 6.57649 1H2.16667C1.52233 1 1 1.52233 1 2.16667Z"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.83331 1V3.33333C6.83331 3.97767 7.35563 4.5 7.99998 4.5H10.3333"
                    stroke="black"
                    strokeLinejoin="round"
                />
            </svg>
            <span>
                {count} статей {endpoint && 'опубликовано'}
            </span>
        </div>
    );
};
