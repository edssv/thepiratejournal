import type { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
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
