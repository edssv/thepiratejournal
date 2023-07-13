import type { Article as IArticle } from '@/interfaces/article';
import { absoluteUrlImageFromStrapi } from '@/lib/utils';

import { Article } from './article';

export function MoreArticles({ data }: { data: IArticle[] }) {
  return (
    <>
      <h3 className='mb-6 text-lg font-medium'>Рекомендуем посмотреть</h3>
      <div className='grid gap-8 sm:grid-cols-2'>
        {data.map(({ attributes, id }) => (
          <Article
            key={id}
            article={{
              cover: absoluteUrlImageFromStrapi(attributes.cover.data.attributes.url),
              createdAt: attributes.createdAt,
              title: attributes.title,
              slug: attributes.slug,
              description: attributes.description
            }}
          />
        ))}
      </div>
    </>
  );
}
