import { useRef, useState } from 'react';

import { useHeadingsData } from './useHeadingsData';
import { useIntersectionObserver } from './useIntersectionObserver';

import styles from './TableOfContents.module.scss';

export const TableOfContents = () => {
    const indicatorRef = useRef<any>(null);
    const [activeId, setActiveId] = useState();
    const { headings }: any = useHeadingsData();

    const handleClick = (id: string) => {
        const region = document.querySelector(`#${id}`);
        region?.scrollIntoView({ behavior: 'smooth' });
    };

    const translateIndicator = (translate: number) => {
        indicatorRef.current.style.transform = `translateY(${translate}px)`;
    };

    useIntersectionObserver(setActiveId, translateIndicator);

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navTrigger} aria-label="Table of contents">
                <span className={styles.label}>В этой статье</span>
                <div
                    ref={indicatorRef}
                    className={`${styles.indicator} ${headings?.id !== activeId ? '' : styles.hide}`}
                />
                <ul className={styles.tabList}>
                    {headings.map((heading: any, i: number) => (
                        <li key={i} onClick={() => handleClick(heading.id)} className={styles.listItem}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => e.preventDefault()}
                                className={`${styles.tocItem} ${heading.id === activeId ? styles.Selected : ''}`}
                            >
                                {heading.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
