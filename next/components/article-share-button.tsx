'use client';

import * as React from 'react';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import ShareArticle from './share-article';

type ArticleShareButtonProps = ButtonProps & { article: { image: string; title: string } } & {
  children: React.ReactNode;
};

export function ArticleShareButton({
  article,
  children,
  className,
  variant = 'ghost',
  ...props
}: ArticleShareButtonProps) {
  return (
    <ShareArticle data={article}>
      <Button className={cn('hover:bg-transparent', className)} variant={variant} {...props}>
        {children}
      </Button>
    </ShareArticle>
  );
}
