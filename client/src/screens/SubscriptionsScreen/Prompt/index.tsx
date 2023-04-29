import React from 'react';

import styles from './Prompt.module.scss';

interface HomeSectionPromptProps {
  headline?: string;
  text?: string;
}

export const Prompt: React.FC<HomeSectionPromptProps> = ({ headline, text }) => (
  <div className={styles.root}>
    <h4 className={styles.headline}>{headline}</h4>
    <p className={styles.paragraph}>{text}</p>
  </div>
);
