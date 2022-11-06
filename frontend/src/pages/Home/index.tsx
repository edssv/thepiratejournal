import React from 'react';
import { Article, useGetArticlesQuery } from '../../redux';

import styles from './Home.module.scss';
import { ArticlePreview } from '../../components/ArticlePreview';
import { useNavigate } from 'react-router-dom';
import { viewsSumCalc } from '../../helpers/viewsSum';
import { Button } from '@adobe/react-spectrum';

const Home = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetArticlesQuery('');

    if (isLoading) return <h3>Загрузка...</h3>;

    return (
        <div className={styles.root}>
            <section className="articles">
                <h4 className="headline">Все статьи</h4>
                <ul className="articles__list">
                    {isLoading
                        ? 'loading...'
                        : data.map((article: Article, id: number) => (
                              <ArticlePreview key={id} article={article} />
                          ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
