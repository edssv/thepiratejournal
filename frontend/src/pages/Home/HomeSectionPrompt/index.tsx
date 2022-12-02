import React from 'react';

import styles from './HomeSectionPrompt.module.scss';

interface HomeSectionPromptProps {
    headline?: string;
    text?: string;
}

export const HomeSectionPrompt: React.FC<HomeSectionPromptProps> = ({ headline, text }) => {
    return (
        <div className={styles.root}>
            <h4 className={styles.headline}>{headline}</h4>
            <p className={styles.paragraph}>{text}</p>
        </div>
    );
};
