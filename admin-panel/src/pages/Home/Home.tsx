import { Article, useGetArticlesQuery } from '../../redux';
import { ArticlePreview } from '../../components';

import styles from './Home.module.scss';

const Home = () => {
    const { data, isLoading } = useGetArticlesQuery('');

    if (isLoading) return <h2>Загрузка...</h2>;

    const articlesList = data?.articles.map((article: Article) => (
        <ArticlePreview key={article._id} article={article} />
    ));
    return (
        <div className={styles.root}>
            <div className={styles.articlesList}>{articlesList}</div>
        </div>
    );
};

export default Home;
