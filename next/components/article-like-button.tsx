'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Icons } from '@/components/icons';
import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LikeService } from '@/services/like/like.service';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type ArticleLikeButtonProps = ButtonProps & {
  article: { id: number; slug: string; likesCount: number };
  isLike: boolean;
  isAuth: boolean;
};

export function ArticleLikeButton({
  article,
  className,
  isAuth,
  isLike,
  variant = 'outline',
  ...props
}: ArticleLikeButtonProps) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const Icon = isLike ? Icons.filledHeart : Icons.heart;

  const onClick = async () => {
    setClicked(true);

    if (isLike) {
      LikeService.delete(article.id);
    } else LikeService.create(article.id);

    await fetch(`/api/revalidate?tag=article,${article.slug}`);
    router.refresh();
  };

  return isAuth ? (
    <Button className={cn('w-auto', className)} variant={isLike ? 'default' : variant} onClick={onClick} {...props}>
      <Icon className={cn('mr-1.5 h-4 w-4', { 'animate-like': clicked && isLike })} />
      <span>{article.likesCount}</span>
    </Button>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-auto', className)} variant={variant} {...props}>
          <Icons.heart className='mr-1.5 h-4 w-4' />
          <span>{article.likesCount}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='text-sm'>
        <span>Войдите в аккаунт, чтобы оценивать статьи</span>
      </PopoverContent>
    </Popover>
  );
}
