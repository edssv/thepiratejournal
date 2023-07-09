import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BackTopButton } from '@/components/article-page/back-top-button';
import { Body } from '@/components/editor-js-components';
import { Icons } from '@/components/icons';
import ShareArticle from '@/components/share-article';
import { Button, buttonVariants } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';
import { env } from '@/env.mjs';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { absoluteUrl, absoluteUrlImageFromStrapi, cn, formatDate } from '@/lib/utils';
import { ArticleService } from '@/services/article/article.service';

interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

async function getArticleFromParams(params: ArticlePageProps['params']) {
  const slug = params?.articleId;
  const { data } = await ArticleService.getArticle(slug);

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
  ogUrl.searchParams.set('image', article.cover.data.attributes.url);
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
    <div className='container flex justify-center xl:justify-start'>
      <article className='relative max-w-3xl py-6 lg:py-10'>
        <div>
          {data.createdAt && (
            <time className='block text-sm text-muted-foreground' dateTime={data.createdAt}>
              {data.updatedAt
                ? `Отредактировано ${formatDate(data.updatedAt)}`
                : `Опубликовано ${formatDate(data.createdAt)}`}
            </time>
          )}
          <h1 className='mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl xl:w-[880px]'>
            {data.title}
          </h1>
          <p className='my-4 text-lg'>{data.description}</p>
          <div className='mt-4 flex items-center justify-between'>
            {data.createdBy.data ? (
              <div className='flex items-center space-x-3 text-sm'>
                <UserAvatar
                  user={{
                    image: '',
                    name: `${data.createdBy.data.attributes.firstname} ${data.createdBy.data.attributes.lastname}`
                  }}
                />
                <div className='flex-1 text-left leading-tight'>
                  <p className='font-medium'>{`${data.createdBy.data.attributes.firstname} ${data.createdBy.data.attributes.lastname}`}</p>
                </div>
              </div>
            ) : null}
            <ShareArticle
              data={{ image: absoluteUrlImageFromStrapi(data.cover.data.attributes.url), label: data.title }}
            >
              <Button size='sm' variant='outline'>
                <Icons.share className='mr-2' /> <span>Поделиться</span>
              </Button>
            </ShareArticle>
          </div>
        </div>
        {data.cover && (
          <div className='lg:-mx-10 xl:-mx-12'>
            <Image
              priority
              alt={data.title}
              className='my-8 w-full rounded-3xl bg-muted transition-colors'
              height={405}
              src={absoluteUrlImageFromStrapi(data.cover.data.attributes.url)}
              width={720}
            />
          </div>
        )}
        <Body data={JSON.parse(data.body)} />
        <hr className='mt-12' />
        <div className='flex justify-center py-6 lg:py-10'>
          <Link className={cn(buttonVariants({ variant: 'ghost' }))} href={getPublicUrl.home()}>
            <Icons.chevronLeft className='mr-2 h-4 w-4' />
            Все статьи
          </Link>
        </div>
      </article>
      <BackTopButton />
    </div>
  );
}
