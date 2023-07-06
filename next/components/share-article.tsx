'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { articleShareConfig } from '@/config/articleShareConfig';
import { env } from '@/env.mjs';

import { Icons } from './icons';

interface ShareProps {
  data: {
    label: string;
    image: string;
  };
}

export default function ShareArticle({ data }: ShareProps) {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const url = `${env.NEXT_PUBLIC_APP_URL}${pathname}`;

  function onCopy() {
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='max-w-10 flex h-10 items-center justify-center rounded-full bg-accent lg:bg-transparent'
          variant='outline'
        >
          <Icons.share className='mr-2' /> <span>Поделиться</span>
        </Button>
      </DialogTrigger>
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
          <h3 className='mb-5 text-xl font-medium'>Share this article</h3>
          <div className='flex gap-6'>
            {articleShareConfig.articleShare.map(({ color, icon, title }) => {
              const Icon = Icons[icon || 'share'];
              return (
                <div className='flex flex-col items-center gap-2'>
                  <Link
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-${color}-100`}
                    target='_blank'
                    href={
                      {
                        vk: `https://vk.com/share.php?url=${url}&title=${data.label}&image=${data.image}`,
                        ok: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.title=${data.label}&st.shareUrl=${url}`,
                        telegram: `https://t.me/share/url?url=${url}&text=${data.label}`
                      }[title] || '/'
                    }
                  >
                    <Icon />
                  </Link>
                  <span className='text-xs text-gray-600'>{title}</span>
                </div>
              );
            })}
          </div>
          <span className='mb-4 mt-6 text-gray-500'>or copy the link</span>
          <div className='flex w-full space-x-2'>
            <Input className='flex w-full' value={url} />
            <CopyToClipboard text={url} onCopy={() => onCopy()}>
              <Button className='w-32' variant='link'>
                {isCopied ? 'Copied!' : 'Copy Link'}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
