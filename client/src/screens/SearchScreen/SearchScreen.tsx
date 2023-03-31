import { useGetSearch } from '@/services';
import { Article } from '@/interfaces/article.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { SearchHeader } from './SearchHeader';
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview';

import styles from './Search.module.scss';

export default function SearchScreen() {
    const { category, query } = useTypedSelector((state) => state.filter);

    const { data, isLoading, isFetching, isError, isSuccess } = useGetSearch(category, query);

    const articlesList =
        isLoading || isFetching ? null : isError ? (
            <h2>Здесь появятся статьи для тебя</h2>
        ) : (
            isSuccess &&
            data?.articles.map((article: Article, id: number) => <ArticlePreview key={id} article={article} />)
        );

    return (
        <div className={styles.root}>
            <SearchHeader />
            <ul className="AiryArticlesList">{articlesList}</ul>
        </div>
    );
}
