import React from 'react';

import styles from './ButtonBookmark.module.scss';

export const ButtonBookmark: React.FC = () => {
    const [bookmark, setBookmark] = React.useState(false);

    return (
        <button className={styles.root} onClick={() => setBookmark(!bookmark)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24">
                {bookmark ? (
                    <g
                        id="favorite_24__Page-2"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fillRule="evenodd">
                        <g id="favorite_24__favorite_24">
                            <path id="favorite_24__Bounds" d="M0 0h24v24H0z"></path>
                            <path
                                d="m15.34 8.48 4.43.43c1.54.15 2.02 1.65.83 2.64l-3.47 2.88 1.29 4.7c.42 1.54-.9 2.48-2.2 1.55L12 17.7l-4.21 2.98c-1.31.92-2.63 0-2.2-1.55l1.28-4.7-3.47-2.88c-1.2-1-.72-2.5.83-2.64l4.43-.43 1.95-4.5c.6-1.4 2.17-1.4 2.78 0l1.95 4.5Z"
                                id="favorite_24__Mask"
                                fill="currentColor"
                                fillRule="nonzero"></path>
                        </g>
                    </g>
                ) : (
                    <path
                        fillRule="evenodd"
                        d="M12.55 4.7a.6.6 0 0 0-1.1 0L9.83 8.6a.9.9 0 0 1-.77.55l-4.13.26a.6.6 0 0 0-.35 1.05l3.26 2.86a.9.9 0 0 1 .29.9l-.94 3.84a.6.6 0 0 0 .89.66l3.47-2a.9.9 0 0 1 .9 0l3.47 2a.6.6 0 0 0 .88-.66l-.93-3.85a.9.9 0 0 1 .29-.89l3.26-2.86a.6.6 0 0 0-.35-1.05l-4.13-.26a.9.9 0 0 1-.77-.56l-1.62-3.9ZM9.78 4a2.4 2.4 0 0 1 4.44 0l1.4 3.39 3.56.23a2.4 2.4 0 0 1 1.43 4.2l-2.86 2.5.8 3.32a2.4 2.4 0 0 1-3.53 2.64L12 18.54l-3.02 1.74a2.4 2.4 0 0 1-3.54-2.64l.8-3.32-2.85-2.5a2.4 2.4 0 0 1 1.43-4.2l3.56-.23L9.78 4Z"
                        clipRule="evenodd"></path>
                )}
            </svg>
        </button>
    );
};
