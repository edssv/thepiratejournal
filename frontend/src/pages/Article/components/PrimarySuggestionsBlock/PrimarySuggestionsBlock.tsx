import { MoonLoader } from 'react-spinners';
import { useArticle } from '../../../../hooks';
import { Article, useGetSuggestionsQuery } from '../../../../redux';
import { ArticlePreview } from './ArticlePreview';

import styles from './SuggestionsBlock.module.scss';

export const PrimarySuggestionsBlock = () => {
    const { article } = useArticle();

    const { data, isLoading, isFetching } = useGetSuggestionsQuery(
        {
            id: article._id,
            category: 'all',
            queryParams: `limit=5&page=0`,
        },
        { refetchOnMountOrArgChange: true },
    );

    return (
        <div className={styles.root}>
            <div className={styles.listContainer}>
                <div className={styles.listLabel}>Тебе может понравиться</div>
                <ul className={`${styles.list} ${(isLoading || isFetching) && styles.loading}`}>
                    {data?.articles.map((item: Article, index: number) => (
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
            </div>
        </div>
    );
};
