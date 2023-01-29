import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { Button } from '../../../components';
import { useArticle } from '../../../hooks';
import { ButtonLike } from '../Buttons';

import styles from './ScrollControls.module.scss';
import { useMediaPredicate } from 'react-media-hook';

interface ScrollControlsProps {
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({ setOpenSidebar }) => {
    const { article } = useArticle();

    const rootRef = useRef<HTMLDivElement>(null);
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(false);
    console.log(!isTablet);

    const handleScroll = debounce(() => {
        const articleBottom = document.querySelector('#articleBottom');
        const currentScrollPos = window.pageYOffset;
        const screenHeight = window.screen.height;
        const rectTop = articleBottom?.getBoundingClientRect().top ?? 0;

        if (isTablet) {
            if (
                (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
                currentScrollPos < 10
            ) {
                setVisible(true);
                rootRef.current?.classList.toggle('hidden');
            } else {
                setVisible(false);
                rootRef.current?.classList.toggle('hidden');
            }
        }

        if (screenHeight - rectTop > 0) {
            setVisible(false);
            // rootRef.current?.classList.add('hidden');
        }

        if (screenHeight - rectTop < 0) {
            if (!isTablet) {
                setVisible(true);
            }
            // rootRef.current?.classList.remove('hidden');
        }
        console.log(rootRef.current?.classList);

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll, isTablet]);

    return (
        <div ref={rootRef} className={styles.root} style={{ opacity: visible ? 1 : 0 }}>
            <div className={styles.actionControls}>
                <div className={styles.buttonsContainer}>
                    <div className={styles.buttons}>
                        <ButtonLike>
                            <span className={styles.buttonText}>{article.likes.count}</span>
                        </ButtonLike>
                        <Button onClick={() => setOpenSidebar((prevState) => !prevState)}>
                            <span className="material-symbols-outlined">comment</span>
                            <span className={styles.buttonText}>
                                {article.comments?.totalCount}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
