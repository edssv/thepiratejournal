import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import 'moment/locale/ru';

import { robotoMono } from '@/app/layout';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { cn } from '@/lib/utils';

interface ArticleProps {
  id: string;
  title: string;
  description: string;
  cover: string;
  createdAt: string;
  featured?: boolean;
}

export const Article: React.FC<ArticleProps> = ({ cover, createdAt, description, featured = false, id, title }) => {
  const TitleTag = featured ? 'h1' : 'h2';
  const date = moment(createdAt).format('DD.MM.YY');

  return (
    <div
      className={cn('article group mt-[72px] basis-auto sm:mt-40 sm:basis-1/2 sm:odd:pr-6', {
        '!m-0 !basis-auto !p-0': featured
      })}
    >
      <Link className={cn({ '!m-0 !p-0': featured })} href={getPublicUrl.blog(String(id))}>
        <div className={cn({ 'flex flex-col items-center lg:flex-row': featured })}>
          <div className={cn({ 'mb-10 w-full basis-full pr-10 lg:w-auto lg:basis-1/2': featured })}>
            <TitleTag
              className={cn(
                'mb-6 line-clamp-3 max-h-[144px] overflow-hidden text-ellipsis text-[40px] font-light leading-[48px] lg:mb-8',
                {
                  'mb-6 mt-0 max-h-[276px] text-[40px] font-light leading-[52px] sm:text-[84px] sm:leading-[92px] lg:mb-0':
                    featured
                }
              )}
            >
              {title}
            </TitleTag>
            <div className='flex flex-col gap-8 lg:flex-row lg:gap-6'>
              <div className={cn(robotoMono.variable, 'text-sm font-light text-gray-500 sm:text-base')}>{date}</div>
              <div className='mb-10'>
                <p className='max-h-15 text spacing line-clamp-3 overflow-hidden text-ellipsis text-base font-light leading-5 tracking-[0.5px] text-gray-500'>
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div>
            <Image
              alt='Обложка'
              height={300}
              priority={featured}
              sizes='100vw'
              src={cover}
              width={300}
              className={cn(
                'h-full w-full rounded-2xl transition-[border-radius] duration-100 group-hover:rounded-[40px]',
                { 'w-full basis-full lg:w-auto lg:basis-1/2': featured }
              )}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
