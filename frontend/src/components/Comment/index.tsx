import React from 'react';

import styles from './Comment.module.scss';

export const Comment = () => {
    return (
        <div className={styles.root}>
            <div className={styles.commentAuthor}>
                <div className="">.</div>
                <span>Igor Ivanov</span>
            </div>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt tenetur reprehenderit
                sint enim laudantium. Error quaerat consequuntur velit aperiam aliquid.
            </p>
        </div>
    );
};
