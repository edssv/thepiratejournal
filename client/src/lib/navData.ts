import { getPublicUrl } from './publicUrlBuilder';

export const navData = [
  { icon: 'home', label: 'Дом', link: getPublicUrl.community() },
  { icon: 'subscriptions', label: 'Подписки', link: '/subscriptions' },
  { icon: 'history', label: 'История', link: '/history' },
  { icon: 'bookmark', label: 'Закладки', link: '/bookmarks' },
  { icon: 'pages', label: 'Блог', link: getPublicUrl.home() },
];
