'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { siteConfig } from '@/config/site';
import { getPublicUrl } from '@/lib/public-url-builder';
import { cn } from '@/lib/utils';
import type { MainNavItem } from '@/types';

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className='flex gap-6 md:gap-10'>
      <Link className='hidden items-center space-x-3 md:flex' href='/'>
        <Image
          alt={`${siteConfig.name}`}
          height={40}
          sizes='25vw'
          src={`${siteConfig.url}/android-chrome-192x192.png`}
          width={40}
        />
        <span className='hidden font-bold sm:inline-block'>{siteConfig.name}</span>
      </Link>
      {!!items?.length && (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                'flex items-center text-lg font-bold transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )}
      <Link className='flex items-center space-x-2 md:hidden' href={getPublicUrl.home()}>
        <Image
          alt={`${siteConfig.name}`}
          height={40}
          sizes='25vw'
          src={`${siteConfig.url}/android-chrome-192x192.png`}
          width={40}
        />
        <span className='font-medium sm:inline-block'>{siteConfig.name}</span>
      </Link>
    </div>
  );
}
