import { Roboto_Mono } from 'next/font/google';

export const robotoMono = Roboto_Mono({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
    display: 'auto',
    variable: '--roboto-mono-font',
});
