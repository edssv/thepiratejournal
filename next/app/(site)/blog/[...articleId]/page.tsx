import type { Metadata } from 'next';

import Body from '@/components/article-page/Body/Body';
import { UpNext } from '@/components/article-page/UpNext/UpNext';
import { AuthorInfo } from '@/components/article-page/author-info';
import { BackTopButton } from '@/components/article-page/back-top-button';
import CreatedAt from '@/components/article-page/created-at';
import Header from '@/components/article-page/header';
import Hero from '@/components/article-page/hero';
import ShareArticle from '@/components/share-article';
import { env } from '@/env.mjs';
import { absoluteUrl } from '@/lib/utils';
import { ArticleService } from '@/services/article/article.service';

interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

async function getArticleFromParams(params: ArticlePageProps['params']) {
  const slug = params?.articleId;
  const { data } = await ArticleService.getArticle(slug);

  console.log(data);
  return data;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { attributes: article } = await getArticleFromParams(params);

  if (!article) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('heading', article.title);
  ogUrl.searchParams.set('type', 'Blog article');
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: article.title,
    description: article.description,

    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: absoluteUrl(article.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogUrl.toString()]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { attributes: data } = await getArticleFromParams(params);
  // const nextArticles = await ArticleService.getNextArticles(params.articleId);

  return (
    <div className='container lg:mb-8'>
      <article className='relative mx-auto mb-[72px] mt-8 w-full max-w-[768px] lg:mb-[100px] lg:mt-[120px] lg:max-w-[1240px]'>
        <div className='mx-auto my-0 flex max-w-[768px]'>
          <div className='mx-auto my-0 flex flex-col lg:m-0'>
            <CreatedAt createdAt={data.createdAt} />
            <Header description={data.description} id={data.slug} title={data.title} />
            <AuthorInfo
              image=''
              username={`${data.createdBy.data.attributes.firstname} ${data.createdBy.data.attributes.lastname}`}
            />
            <ShareArticle data={{ image: `${env.STRAPI_URL}${data.cover.data.attributes.url}`, label: data.title }} />
            <Hero cover={`${env.STRAPI_URL}${data.cover.data.attributes.url}`} />
            <Body data={data.body} />
            <AuthorInfo
              image=''
              username={`${data.createdBy.data.attributes.firstname} ${data.createdBy.data.attributes.lastname}`}
            />
          </div>
        </div>
      </article>
      {/* <UpNext data={nextArticles.data} /> */}
      <BackTopButton />
    </div>
  );
}
