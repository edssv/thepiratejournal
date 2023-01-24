import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { Button } from '../../../components';
import { useArticle } from '../../../hooks';
import { Article, useGetSuggestionsQuery } from '../../../redux';
import { ArticlePreview } from './ArticlePreview';

import styles from './SuggestionsBlock.module.scss';

export const SuggestionsBlock = () => {
    const { article } = useArticle();
    const [category, setCategory] = useState<'all' | 'similar'>('all');
    const [currentPage, setCurrentPage] = useState({ all: 0, simillar: 0 });

    const { isLoading, isFetching, isSuccess } = useGetSuggestionsQuery({
        id: article._id,
        category: category,
        queryParams: `game=${article.category.game}&limit=15&page=${
            category === 'all' ? currentPage.all : currentPage.simillar
        }`,
    });

    const handleFetchMoreArticles = () => {
        if (articlesPath?.list.length < articlesPath.totalCount) {
            setCurrentPage((prevState) =>
                category === 'all'
                    ? { all: prevState.all + 1, simillar: prevState.simillar }
                    : { all: prevState.all, simillar: prevState.simillar + 1 },
            );
        }
    };

    const articlesPathRecognize = () => {
        if (category === 'similar') return article.suggestions?.articles.similar;
        else return article.suggestions?.articles.all;
    };

    const articlesPath = articlesPathRecognize();

    return (
        <div className={styles.root}>
            <div className={styles.scrollContainer}>
                <div className={styles.ironSelector}>
                    <div
                        onClick={() => setCategory('all')}
                        className={`${styles.cloudChip} ${
                            category === 'all' ? styles.active : ''
                        }`}>
                        Все статьи
                    </div>
                    <div
                        onClick={() => setCategory('similar')}
                        className={`${styles.cloudChip} ${
                            category === 'similar' ? styles.active : ''
                        }`}>
                        Похожее
                    </div>
                </div>
            </div>
            <div className={styles.listContainer}>
                <ul className={`${styles.list} ${(isLoading || isFetching) && styles.loading}`}>
                    {(articlesPath?.list.length === 0 && isFetching
                        ? article.suggestions.articles?.all || article.suggestions.articles?.similar
                        : articlesPath
                    )?.list.map((item: Article, index: number) => (
                        <li key={index}>
                            <ArticlePreview article={item} />
                        </li>
                    ))}
                </ul>
                {(isLoading || isFetching) && (
                    <div className={styles.loaderContainer}>
                        <MoonLoader
                            size="24px"
                            speedMultiplier={0.9}
                            color="var(--md-sys-color-on-surface)"
                        />
                    </div>
                )}

                {isSuccess && articlesPath?.list.length === 0 && <h5>Похожие статьи не найдены</h5>}
            </div>
            {articlesPath?.list.length < articlesPath?.totalCount && (
                <Button
                    onClick={handleFetchMoreArticles}
                    isLoading={isLoading || isFetching}
                    disabled={isLoading || isFetching}
                    variant="outlined"
                    className={styles.loadingBtn}>
                    Еще
                </Button>
            )}
        </div>
    );
};
