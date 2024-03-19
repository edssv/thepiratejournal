'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { articleShareConfig } from '@/config/article-share';
import { env } from '@/env.mjs';

import { Icons } from './icons';

interface ShareArticleProps {
  data: {
    title: string;
    image: string;
  };
  children: React.ReactNode;
}

export default function ShareArticle({ children, data }: ShareArticleProps) {
  const pathname = usePathname();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const url = `${env.NEXT_PUBLIC_APP_URL}${pathname}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader />
        <div className='flex flex-col items-center'>
          <Image
            priority
            alt='Cover'
            className='mb-8 rounded-lg'
            height={231}
            sizes='50vw'
            src={data.image}
            style={{ height: '231px', objectFit: 'cover' }}
            width={457}
          />
          <h3 className='mb-5 text-xl font-medium'>Поделиться этой статьей</h3>
          <div className='flex gap-6'>
            {articleShareConfig.articleShare.map(({ color, icon, title }) => {
              const Icon = Icons[icon || 'share'];
              return (
                <div key={title} className='flex flex-col items-center gap-2'>
                  <Link
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-${color}-100`}
                    target='_blank'
                    href={
                      {
                        vk: `https://vk.com/share.php?url=${url}&title=${data.title}&image=${data.image}`,
                        ok: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.title=${data.title}&st.shareUrl=${url}`,
                        telegram: `https://t.me/share/url?url=${url}&text=${data.title}`
                      }[title.toLocaleLowerCase()] || '/'
                    }
                  >
                    <Icon />
                  </Link>
                  <span className='text-xs text-muted-foreground'>{title}</span>
                </div>
              );
            })}
          </div>
          <span className='mb-4 mt-6 text-muted-foreground'>или скопировать ссылку</span>
          <div className='flex w-full space-x-2'>
            <Input className='flex w-full' value={url} />

            <Button
              className='w-32'
              variant='link'
              onClick={() => {
                copyToClipboard();
                setHasCopied(true);
              }}
            >
              {hasCopied ? 'Скопировано!' : 'Копировать'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
