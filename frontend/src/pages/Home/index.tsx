import React from 'react';
import { Article, useGetArticlesQuery } from '../../redux';

import styles from './Home.module.scss';
import { ArticlePreview } from '../../components/ArticlePreview';
import { useNavigate } from 'react-router-dom';
import { viewsSumCalc } from '../../helpers/viewsSum';
import { Button, ProgressCircle } from '@adobe/react-spectrum';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ArticleSkeleton } from '../../components/ArticlePreview/ArticleSkeleton';

const Home = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetArticlesQuery('');

    return (
        <div className={styles.root}>
            <section className="articles">
                <h4 className="headline">Все статьи</h4>

                <ul className="articles__list">
                    {isLoading ? (
                        <ArticleSkeleton counts={12} />
                    ) : (
                        data.map((article: Article, id: number) => (
                            <ArticlePreview key={id} article={article} />
                        ))
                    )}
                </ul>
            </section>
        </div>
    );
};

export default Home;
