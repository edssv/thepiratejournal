import Image from 'next/image';
import Link from 'next/link';

import type { Article } from '@/interfaces/article';
import { getPublicUrl } from '@/lib/public-url-builder';
import { absoluteUrlImageFromStrapi, cn, formatDate } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

interface ArticleProps extends Pick<Article['attributes'], 'cover' | 'createdAt' | 'description' | 'title' | 'slug'> {
  featured?: boolean;
}

export function ArticlePreview({ cover, createdAt, description, featured = false, slug, title }: ArticleProps) {
  const TitleTag = featured ? 'h1' : 'h2';
  const date = formatDate(createdAt, { month: 'numeric', day: 'numeric', year: '2-digit' });

  return (
    <div
      className={cn('group mt-[72px] basis-auto sm:mt-40 sm:basis-1/2', {
        '!m-0 !basis-auto !p-0': featured,
        article: !featured
      })}
    >
      <Link href={getPublicUrl.blog(slug)}>
        <div className={cn({ 'flex flex-col items-center lg:flex-row': featured })}>
          <div className={cn({ 'w-full basis-full pr-10 sm:mb-10 lg:w-auto lg:basis-1/2': featured })}>
            <TitleTag
              className={cn(
                'mb-6 line-clamp-3 max-h-[144px] overflow-hidden text-ellipsis text-[40px] font-light leading-[48px] lg:mb-8',
                {
                  'mt-0 max-h-[276px] text-[40px] leading-[52px] sm:text-[84px] sm:leading-[92px]': featured
                }
              )}
            >
              {title}
            </TitleTag>
            <div className='flex flex-col lg:flex-row'>
              <div
                className={cn(
                  'mb-8 mr-0 font-mono text-sm leading-[21px] text-muted-foreground sm:text-base sm:leading-6 lg:mb-0 lg:mr-6'
                )}
              >
                {date}
              </div>
              <div className='mb-10'>
                <p className='max-h-15 text spacing line-clamp-3 overflow-hidden text-ellipsis text-base font-light leading-5 tracking-[0.5px] text-muted-foreground'>
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className={cn({ 'w-full basis-full lg:w-auto lg:basis-1/2': featured })}>
            <Image
              alt='Обложка'
              height={300}
              priority={featured}
              sizes='100vw'
              src={absoluteUrlImageFromStrapi(cover.data.attributes.url)}
              width={300}
              className={cn(
                'h-full w-full rounded-2xl transition-[border-radius] duration-100 group-hover:rounded-[40px]'
              )}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

ArticlePreview.Skeleton = function ArticleSkeleton() {
  return (
    <div className='article group mt-[72px] basis-auto sm:mt-40 sm:basis-1/2'>
      <div>
        <div>
          <div className='mb-6 flex flex-col gap-3 lg:mb-8'>
            <Skeleton className='h-6 w-5/6' />
            <Skeleton className='h-6' />
            <Skeleton className='h-6 w-4/5' />
          </div>
          <div className='flex flex-col lg:flex-row '>
            <Skeleton className='mb-8 mr-0 h-3 w-32 lg:mb-0 lg:mr-6' />
            <div className='mb-10 flex w-full flex-col gap-1.5'>
              <Skeleton className='h-3' />
              <Skeleton className='h-3' />
              <Skeleton className='h-3' />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <Skeleton className='h-60 w-full rounded-2xl' />
        </div>
      </div>
    </div>
  );
};
