'use client';

import * as React from 'react';
import { useInView } from 'react-intersection-observer';

import type { GetArticleListResponse } from '@/interfaces/get-article-list-res';
import { ArticleService } from '@/services/article/article.service';

import { ArticlePreview } from '../article-preview';

export function ArticleList({ initialData }: { initialData: GetArticleListResponse }) {
  const [articles, setArticles] = React.useState(initialData.data);
  const [nextPage, setNextPage] = React.useState(
    initialData.meta.pagination.pageCount - initialData.meta.pagination.page > 0 ? 2 : null
  );
  const [loading, setLoading] = React.useState(false);

  const lastArticleRef = React.useRef<HTMLElement>(null);

  const { entry, ref } = useInView({
    root: lastArticleRef.current,
    threshold: 1
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await ArticleService.getArticleList(nextPage, 20);

      setArticles((state) => [...state, ...res.data]);
      setNextPage(res.meta.pagination.pageCount - res.meta.pagination.page > 0 ? res.meta.pagination.page + 1 : null);
      setLoading(false);
    };

    if (entry?.isIntersecting && nextPage !== null) {
      fetchData();
    }
  }, [nextPage, entry]);

  const featuredArticle = articles[0];

  return (
    <>
      <ArticlePreview
        key={featuredArticle.id}
        featured
        cover={featuredArticle.attributes.cover}
        createdAt={featuredArticle.attributes.createdAt}
        description={featuredArticle.attributes.description}
        slug={featuredArticle.attributes.slug}
        title={featuredArticle.attributes.title}
      />
      <div className='flex flex-wrap items-center'>
        {articles.slice(1).map((article) => (
          <ArticlePreview
            key={article.id}
            cover={article.attributes.cover}
            createdAt={article.attributes.createdAt}
            description={article.attributes.description}
            slug={article.attributes.slug}
            title={article.attributes.title}
          />
        ))}
      </div>
      {!!articles?.length && !loading && <div ref={ref} />}
      {loading && [...new Array(4)].map(() => <ArticlePreview.Skeleton />)}
    </>
  );
}
