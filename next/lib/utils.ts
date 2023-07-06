import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.mjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function absoluteUrlImageFromStrapi(imageSrc: string) {
  return typeof window === 'undefined' ? ` ${env.STRAPI_URL}${imageSrc}` : `${env.NEXT_PUBLIC_STRAPI_URL}${imageSrc}`;
}
