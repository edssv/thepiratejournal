'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { env } from '@/env.mjs';
import type { GetArticleListResponse } from '@/interfaces/get-article-list-res';
import { ArticleService } from '@/services/article/article.service';

import { Article } from '../article';

export function ArticleList({ initialData }: { initialData: GetArticleListResponse }) {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['query'],
    async ({ pageParam = 1 }) => {
      const response = await ArticleService.getArticleList(4 * pageParam, 4);
      return response.data;
    },
    {
      getNextPageParam: (_, pages) => pages.length,
      enabled: false,
      initialData: { pages: [initialData.data], pageParams: [1] }
    }
  );

  const lastArticleRef = useRef<HTMLElement>(null);

  const { entry, ref } = useInView({
    root: lastArticleRef.current,
    threshold: 0.5
  });

  const articles = data?.pages.flatMap((page) => page);

  useEffect(() => {
    const isExistNextPage = articles && initialData.meta.pagination.total > articles.length;
    if (entry?.isIntersecting && isExistNextPage) fetchNextPage();
  }, [entry, fetchNextPage, initialData, articles]);

  return (
    <>
      {articles?.length ? (
        <>
          {articles?.slice(0, 1).map(({ attributes, id }) => (
            <Article
              key={id}
              featured
              priority
              cover={`${env.NEXT_PUBLIC_STRAPI_URL}${attributes.cover?.data.attributes.url}`}
              createdAt={attributes.createdAt}
              description={attributes.description}
              id={attributes.slug}
              title={attributes.title}
            />
          ))}
          {articles?.length > 1 ? (
            <div className='flex flex-wrap items-center'>
              {articles?.slice(1).map(({ attributes, id }, index) => (
                <Article
                  key={id}
                  cover={`${env.NEXT_PUBLIC_STRAPI_URL}${attributes.cover?.data.attributes.url}`}
                  createdAt={attributes.createdAt}
                  description={attributes.description}
                  id={attributes.slug}
                  priority={index < 3}
                  title={attributes.title}
                />
              ))}
              {isFetchingNextPage && [...new Array(4)].map(() => <Article.Skeleton />)}
            </div>
          ) : null}
        </>
      ) : null}
      {articles?.length && !isFetchingNextPage ? <div ref={ref} /> : null}
    </>
  );
}
