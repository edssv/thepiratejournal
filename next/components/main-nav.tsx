'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import * as React from 'react';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { MainNavItem } from '@/types';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ children, items }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

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
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
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
      ) : null}

      <Link className='flex items-center space-x-2 md:hidden' href='/'>
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
