import { getPublicUrl } from './publicUrlBuilder';

export const dashboardNavData = [
  { label: 'Статьи', href: getPublicUrl.dashboard(), icon: 'article' },
  { label: 'Черновики', href: getPublicUrl.dashboardDrafts(), icon: 'draft' },
  { label: 'Настройки', href: getPublicUrl.dashboardSetting(), icon: 'settings' }
];
