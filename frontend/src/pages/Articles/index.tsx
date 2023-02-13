import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArticlePreview, ArticlePreviewSkeleton } from '../../components';
import { Article, useSearchArticlesQuery } from '../../redux';

import styles from './Articles.module.scss';
import { SearchHeader } from './SearchHeader';

export default function Articles() {
    const location = useLocation();

    const sectionFromUrl = location.pathname.split('/')[2];
    const sortFromUrl = location.search.split('sort=')[1];
    const searchFromUrl = location.search.split('search=')[1];
    const [selectCategory, setSelectCategory] = useState(sectionFromUrl ? sectionFromUrl : '');
    const [sortType, setSortType] = React.useState<React.Key>(sortFromUrl ? sortFromUrl : '');
    const [searchValue, setSearchValue] = useState(searchFromUrl ? decodeURI(searchFromUrl) : '');
    const [queryParams, setQueryParams] = useState('');
    const { data, isLoading, isFetching, isError, isSuccess } = useSearchArticlesQuery({
        category: selectCategory,
        queryParams,
    });

    const articlesList =
        isLoading || isFetching ? (
            <ArticlePreviewSkeleton counts={12} />
        ) : isError ? (
            <h2>Здесь появятся статьи для тебя</h2>
        ) : (
            isSuccess && data?.map((article: Article, id: number) => <ArticlePreview key={id} article={article} />)
        );

    return (
        <div className={styles.root}>
            <SearchHeader
                selectCategory={selectCategory}
                setSelectCategory={setSelectCategory}
                sortType={sortType}
                setSortType={setSortType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setQueryParams={setQueryParams}
            />

            <ul className="articles__list">{articlesList}</ul>
        </div>
    );
}
