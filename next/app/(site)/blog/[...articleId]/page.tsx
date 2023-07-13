import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ArticleLikeButton } from '@/components/article-like-button';
import { BackTopButton } from '@/components/article-page/back-top-button';
import { MoreArticles } from '@/components/article-page/more-articles/more-articles';
import { ArticleShareButton } from '@/components/article-share-button';
import { Body } from '@/components/editor-js-components';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';
import { env } from '@/env.mjs';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { getCurrentUser } from '@/lib/session';
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
  const { attributes: data, id: articleId } = await getArticleFromParams(params);
  const { data: moreArticlesData } = await ArticleService.getNextArticles(params.articleId);
  const { data: isLikeArticle } = await ArticleService.checkLike(articleId);
  const user = await getCurrentUser();

  return (
    <article className='container relative max-w-3xl px-6 py-6 sm:px-8 lg:py-10'>
      <Link
        className={cn(buttonVariants({ variant: 'ghost' }), 'absolute left-[-200px] top-14 hidden xl:inline-flex')}
        href={getPublicUrl.home()}
      >
        <Icons.chevronLeft className='mr-2 h-4 w-4' />
        Все статьи
      </Link>
      <div>
        {data.createdAt && (
          <time className='block text-sm text-muted-foreground' dateTime={data.createdAt}>
            Опубликовано {formatDate(data.createdAt)}
          </time>
        )}
        <h1 className='font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl xl:w-[880px]'>{data.title}</h1>
        <p className='my-4 text-lg'>{data.description}</p>
        <div className='mt-4 flex items-center justify-between gap-x-3 gap-y-6'>
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
          <div className='flex gap-3'>
            <ArticleLikeButton
              article={{ id: articleId, slug: data.slug, likesCount: data.likes.data.length }}
              isAuth={!!user}
              isLike={isLikeArticle?.attributes?.isLike}
              size='sm'
            />
            <ArticleShareButton
              article={{ image: absoluteUrlImageFromStrapi(data.cover.data.attributes.url), title: data.title }}
              size='sm'
              variant='outline'
            >
              <Icons.share /> <span className='ml-2'>Поделиться</span>
            </ArticleShareButton>
          </div>
        </div>
      </div>
      {data.cover && (
        <div className='lg:-mx-10 xl:-mx-12'>
          <Image
            priority
            alt={data.title}
            className='my-8 w-full rounded-3xl bg-muted transition-colors'
            height={data.cover.data.attributes.height}
            src={absoluteUrlImageFromStrapi(data.cover.data.attributes.url)}
            width={data.cover.data.attributes.width}
          />
        </div>
      )}
      <Body data={JSON.parse(data.body)} />
      <hr className='mb-6 mt-12' />
      <div className='mb-6 flex justify-between gap-3'>
        <ArticleLikeButton
          article={{ id: articleId, slug: data.slug, likesCount: data.likes.data.length }}
          isAuth={!!user}
          isLike={isLikeArticle?.attributes?.isLike}
          size='sm'
        />
        <ArticleShareButton
          article={{ image: absoluteUrlImageFromStrapi(data.cover.data.attributes.url), title: data.title }}
          size='sm'
          variant='outline'
        >
          <Icons.share /> <span className='ml-2'>Поделиться</span>
        </ArticleShareButton>
      </div>
      {/* <div className='flex justify-center py-6 lg:py-10'>
        <Link className={cn(buttonVariants({ variant: 'ghost' }))} href={getPublicUrl.home()}>
          <Icons.chevronLeft className='mr-2 h-4 w-4' />
          Все статьи
        </Link>
      </div> */}

      <hr className='mb-12 border-transparent bg-transparent' />
      {moreArticlesData.length ? <MoreArticles data={moreArticlesData} /> : null}
      <BackTopButton />
    </article>
  );
}
