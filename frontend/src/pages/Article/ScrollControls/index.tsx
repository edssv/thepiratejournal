import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../../redux';
import debounce from 'lodash.debounce';
import { ButtonBookmark, ButtonDelete, ButtonLike } from '../../../components';
import { Button, ButtonGroup, Divider } from '@adobe/react-spectrum';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';
import Delete from '@spectrum-icons/workflow/Delete';
import Edit from '@spectrum-icons/workflow/Edit';
import Reply from '@spectrum-icons/workflow/Reply';

import styles from './ScrollControls.module.scss';

interface ScrollControlsProps {
    articleId: string | undefined;
    isLiked: boolean | undefined;
    hasBookmark: boolean | undefined;
    isOwner: boolean | undefined;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({
    articleId,
    isLiked,
    hasBookmark,
    isOwner,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

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
                    <ButtonLike isLiked={isLiked} id={articleId} tooltipPosition="left" />
                    <ButtonBookmark hasBookmark={hasBookmark} id={articleId} />
                    <Button variant="secondary">
                        <Reply />
                    </Button>
                </div>
                {isOwner && (
                    <div className={styles.ownerControls}>
                        <Button
                            variant="secondary"
                            onPress={() =>
                                navigate(`/articles/${articleId}/edit`, {
                                    state: { from: location },
                                })
                            }>
                            <Edit />
                        </Button>
                        <ButtonDelete
                            onPrimaryAction={() => {
                                deleteArticle(articleId);
                                navigate(fromPage ? fromPage : '/');
                            }}
                            variant="secondary">
                            <Delete />
                        </ButtonDelete>
                    </div>
                )}
            </div>
        </div>
    );
};
