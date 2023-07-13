export const getPublicUrl = {
  blog(id: string) {
    return `/blog/${id}`;
  },
  dashboard() {
    return '/dashboard';
  },
  dashboardArticles() {
    return '/dashboard/articles';
  },
  dashboardDrafts() {
    return '/dashboard/drafts';
  },
  dashboardSetting() {
    return '/dashboard/settings';
  },
  home() {
    return '/';
  },
  login() {
    return '/login';
  },
  register() {
    return '/register';
  },
  privacy() {
    return '/privacy';
  },
  terms() {
    return '/terms';
  }
};
