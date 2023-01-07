import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../redux';
import debounce from 'lodash.debounce';
import { ButtonBookmark, ButtonDelete, ButtonLike, ButtonShare } from '../Buttons';

import styles from './ScrollControls.module.scss';
import { Button } from '../../../components';
import { useArticle } from '../../../hooks';

interface ScrollControlsProps {
    hasBookmark: boolean | undefined;
    isOwner: boolean | undefined;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({ hasBookmark, isOwner }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { article } = useArticle();

    const fromPage = location?.state?.from?.pathname;

    const [deleteArticle] = useDeleteArticleMutation();

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const screenHeight = window.screen.height;
    const scrollYMax = document.documentElement.scrollHeight;
    const [visible, setVisible] = useState(scrollYMax - screenHeight <= 900 ? false : true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        const screenHeight = window.screen.height;
        const scrollTop = document.documentElement.scrollTop;
        const scrollYMax = document.documentElement.scrollHeight;

        setVisible(
            (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
                currentScrollPos < 10,
        );

        if (scrollYMax - (scrollTop + screenHeight) < 250) {
            setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div className={styles.root} style={{ transform: visible ? 'unset' : 'translateY(100%)' }}>
            <div className={styles.buttonGroup}>
                <div className={styles.controls}>
                    <ButtonLike variant="text" />
                    <ButtonBookmark />
                    <ButtonShare />
                </div>
                {isOwner && (
                    <div className={styles.ownerControls}>
                        <Button
                            icon
                            onClick={() =>
                                navigate(`/articles/${article._id}/edit`, {
                                    state: { from: location },
                                })
                            }
                            variant="text">
                            <span className="material-symbols-outlined">edit</span>
                        </Button>
                        <ButtonDelete
                            onPrimaryAction={() => {
                                deleteArticle(article._id);
                                navigate(fromPage ? fromPage : '/');
                            }}
                            icon
                            variant="text">
                            <span className="material-symbols-outlined">delete</span>
                        </ButtonDelete>
                    </div>
                )}
            </div>
        </div>
    );
};
