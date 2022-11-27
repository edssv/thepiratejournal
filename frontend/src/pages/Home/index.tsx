import { Article, useGetArticlesQuery } from '../../redux';
import { useDocTitle } from '../../hooks/useDocTitle';
import { ArticlePreview, ArticleSkeleton } from '../../components';

import styles from './Home.module.scss';
const Home = () => {
    useDocTitle('');

    const { data, isLoading } = useGetArticlesQuery(null);
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
