import type { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs'
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true
    }
  ],
  sidebarNav: [
    {
      title: 'Понравившиеся',
      href: '/dashboard',
      icon: 'heart'
    },

    {
      title: 'Настройки',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ]
};
