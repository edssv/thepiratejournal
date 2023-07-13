import Image from 'next/image';
import Link from 'next/link';

import { PostOperations } from '@/components/post-operations';
import { Skeleton } from '@/components/ui/skeleton';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { formatDate } from '@/lib/utils';

interface ArticleItemProps {
  article: { slug: string; title: string; createdAt: string; cover: string };
}

export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex gap-4'>
        <Image
          alt={article.title}
          className='h-12 w-12 rounded-sm object-cover'
          height={48}
          quality={80}
          sizes='(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 5vw'
          src={article.cover}
          width={48}
        />
        <div className='grid gap-1'>
          <Link className='font-semibold hover:underline' href={getPublicUrl.blog(article.slug)}>
            {article.title}
          </Link>
          <div>
            <p className='text-sm text-muted-foreground'>{formatDate(article.createdAt)}</p>
          </div>
        </div>
      </div>
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
}

ArticleItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  );
};
