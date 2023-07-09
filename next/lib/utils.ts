import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function absoluteUrlImageFromStrapi(imageSrc: string) {
  return typeof window === 'undefined' ? ` ${env.STRAPI_URL}${imageSrc}` : `${env.NEXT_PUBLIC_STRAPI_URL}${imageSrc}`;
}
