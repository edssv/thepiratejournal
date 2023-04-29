export const getPublicUrl = {
  article(id: string | number) {
    return `${this.community()}/articles/${id}`;
  },
  articleEdit(id: string | number) {
    return `${this.community()}/articles/${id}/edit`;
  },
  articleNew() {
    return `${this.community()}/articles/new`;
  },
  blog(id: string) {
    return `/blog/${id}`;
  },
  blogPage() {
    return `${this.home()}`;
  },
  bookmarks() {
    return `${this.community()}/bookmarks`;
  },
  community() {
    return '/community';
  },
  draftEdit(id: string | number) {
    return `${this.community()}/drafts/${id}/edit`;
  },
  home() {
    return '/';
  },
  history() {
    return `${this.community()}/history`;
  },
  login() {
    return '/login';
  },
  privacy() {
    return '/privacy';
  },
  profile(id: string | number) {
    return `${this.community()}/users/${id}`;
  },
  profileWithCategory(id: string | number, category: string) {
    return `${this.community()}/users/${id}/${category}`;
  },
  search(query?: string) {
    return query ? `${this.community()}/search?${query}` : `${this.community()}/search`;
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
  subscriptions() {
    return `${this.community()}/subscriptions`;
  },
  terms() {
    return '/terms';
  },
  user(id: string) {
    return `${this.community()}/users/${id}`;
  }
};
