import { Inter as FontSans, Roboto_Mono } from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans'
});

export const robotoMono = Roboto_Mono({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-roboto-mono'
});
