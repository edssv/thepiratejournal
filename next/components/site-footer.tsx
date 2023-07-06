import Image from 'next/image';
import * as React from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0'>
        <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
          <Image
            alt={`${siteConfig.name}`}
            height={32}
            sizes='20vw'
            src={`${siteConfig.url}/android-chrome-192x192.png`}
            width={32}
          />
          <p className='text-center text-sm leading-loose md:text-left'>
            Built by{' '}
            <a
              className='font-medium underline underline-offset-4'
              href={siteConfig.links.vkProfile}
              rel='noreferrer'
              target='_blank'
            >
              ForeverBetter
            </a>
            . Inspired by{' '}
            <a
              className='font-medium underline underline-offset-4'
              href='https://twitter.com/shadcn'
              rel='noreferrer'
              target='_blank'
            >
              shadcn
            </a>
            . The source code is available on{' '}
            <a
              className='font-medium underline underline-offset-4'
              href={siteConfig.links.github}
              rel='noreferrer'
              target='_blank'
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
