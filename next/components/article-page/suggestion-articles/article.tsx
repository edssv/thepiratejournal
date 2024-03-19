import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { formatDate } from '@/lib/utils';

interface ArticleProps {
  article: {
    slug: string;
    title: string;
    description: string;
    cover: string;
    createdAt: string;
  };
}

export function Article({ article }: ArticleProps) {
  return (
    <article className='group relative flex flex-col space-y-2'>
      {article.cover && (
        <Image
          alt={article.title}
          className='rounded-lg bg-muted transition-colors'
          height={452}
          src={article.cover}
          width={804}
        />
      )}
      <h2 className='text-xl font-medium'>
        <Balancer>{article.title}</Balancer>
      </h2>
      {article.description && (
        <p className='text-muted-foreground'>
          <Balancer>{article.description}</Balancer>
        </p>
      )}
      {article.createdAt && <p className='text-sm text-muted-foreground'>{formatDate(article.createdAt)}</p>}
      <Link className='absolute inset-0' href={article.slug}>
        <span className='sr-only'>View Article</span>
      </Link>
    </article>
  );
}
