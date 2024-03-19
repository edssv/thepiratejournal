import { env } from '@/env.mjs';
import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'The Pirate Journal',
  description:
    'Добро пожаловать в мир игр и виртуальных приключений! Здесь вы найдете свежие новости, глубокие обзоры, советы и стратегии для геймеров всех уровней. Присоединяйтесь к нашему сообществу и делимся впечатлениями о любимых играх!',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: { vkProfile: 'https://vk.com/sysoeev', github: 'https://github.com/edssv/thepiratejournal' },
  creator: 'Эдуард Сысоев'
};
