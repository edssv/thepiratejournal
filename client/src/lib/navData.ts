import { getPublicUrl } from './publicUrlBuilder';

export const navData = [
  { icon: 'home', label: 'Дом', link: getPublicUrl.community() },
  { icon: 'subscriptions', label: 'Подписки', link: getPublicUrl.subscriptions() },
  { icon: 'history', label: 'История', link: getPublicUrl.history() },
  { icon: 'bookmark', label: 'Закладки', link: getPublicUrl.bookmarks() },
  { icon: 'pages', label: 'Блог', link: getPublicUrl.home() }
];
