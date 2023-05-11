export const getPublicUrl = {
  article(id: string | number) {
    return `/blog/${id}`;
  },
  articleEdit(id: string | number) {
    return `/editor/${id}`;
  },
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
  editor() {
    return `/editor`;
  },
  draftEdit(id: string | number) {
    return `/editor/drafts/${id}`;
  },
  home() {
    return '/';
  },
  login() {
    return '/login';
  },
  privacy() {
    return '/privacy';
  },
  shareFacebook(category: 'articles' | 'blog', id: string) {
    return `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
  shareTwitter(title: string, category: 'articles' | 'blog', id: string) {
    return `https://twitter.com/intent/tweet?text=${title}&url=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
  shareVk(category: 'articles' | 'blog', id: string) {
    return `https://vk.com/share.php?url=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
  signup() {
    return '/signup';
  },
  signupStepSecond() {
    return '/signup/2';
  },
  terms() {
    return '/terms';
  }
};
