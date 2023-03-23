import { useSelector } from 'react-redux';

import { ArticlePreview, AiryArticleSkeleton } from '../../components';
import { Article, selectFilter, useSearchArticlesQuery } from '@/store';
import { SearchHeader } from './SearchHeader';

import styles from './Articles.module.scss';

export default function Articles() {
    const { category, query } = useSelector(selectFilter);

    const { data, isLoading, isFetching, isError, isSuccess } = useSearchArticlesQuery({
        category: category,
        queryParams: query,
    });

    const articlesList =
        isLoading || isFetching ? (
            <AiryArticleSkeleton counts={21} />
        ) : isError ? (
            <h2>Здесь появятся статьи для тебя</h2>
        ) : (
            isSuccess && data?.map((article: Article, id: number) => <ArticlePreview key={id} article={article} />)
        );

    return (
        <div className={styles.root}>
            <SearchHeader />
            <ul className="AiryArticlesList">{articlesList}</ul>
        </div>
    );
}
