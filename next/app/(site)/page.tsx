import { Article } from '@/components/article/Article';
import { env } from '@/env.mjs';
import { ArticleService } from '@/services/article/article.service';

export const metadata = {
  title: 'Главная'
};

export default async function MainPage() {
  const { data } = await ArticleService.getArticleList();

  return (
    <div className='container flex-wrap py-6 lg:py-10'>
      <div className='flex flex-wrap items-center'>
        {data?.map(({ attributes, id }, index) => (
          <Article
            key={id}
            cover={`${env.STRAPI_URL}${attributes.cover?.data.attributes.url}`}
            createdAt={attributes.createdAt}
            description={attributes.description}
            featured={index === 0}
            id={attributes.slug}
            priority={index < 3}
            title={attributes.title}
          />
        ))}
      </div>
    </div>
  );
}
