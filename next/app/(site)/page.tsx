import { Article } from '@/components/article';
import { env } from '@/env.mjs';
import { ArticleService } from '@/services/article/article.service';

export default async function MainPage() {
  const { data } = await ArticleService.getArticleList();

  return (
    <div className='container flex-wrap py-6 lg:py-10'>
      {data?.length
        ? data
            ?.slice(0, 1)
            .map(({ attributes, id }) => (
              <Article
                key={id}
                featured
                priority
                cover={`${env.STRAPI_URL}${attributes.cover?.data.attributes.url}`}
                createdAt={attributes.createdAt}
                description={attributes.description}
                id={attributes.slug}
                title={attributes.title}
              />
            ))
        : null}
      {data?.length > 1 ? (
        <div className='flex flex-wrap items-center'>
          {data?.slice(1).map(({ attributes, id }, index) => (
            <Article
              key={id}
              cover={`${env.STRAPI_URL}${attributes.cover?.data.attributes.url}`}
              createdAt={attributes.createdAt}
              description={attributes.description}
              id={attributes.slug}
              priority={index < 3}
              title={attributes.title}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
