export const getPublicUrl = {
  home() {
    return '/';
  },
  community() {
    return '/community';
  },
  login() {
    return '/login';
  },
  signup() {
    return '/signup';
  },
  search(query?: string) {
    return query ? `${this.community()}/search?${query}` : `${this.community()}/search`;
  },
  article(id: string | number) {
    return `${this.community()}/articles/${id}`;
  },
  articleNew() {
    return `${this.community()}/articles/new`;
  },
  articleEdit(id: string | number) {
    return `${this.community()}/articles/${id}/edit`;
  },
  user(id: string) {
    return `${this.community}/users/${id}`;
  },
  blog(id: string) {
    return `/blog/${id}`;
  },
  blogPage() {
    return `${this.home()}`;
  },
  draftEdit(id: string | number) {
    return `${this.community()}/drafts/${id}/edit`;
  },
  profile(id: string | number) {
    return `${this.community()}/users/${id}`;
  },
  profileWithCategory(id: string | number, category: string) {
    return `${this.community()}/users/${id}/${category}`;
  },
  shareVk(category: 'articles' | 'blog', id: string) {
    return `https://vk.com/share.php?url=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
  shareTwitter(title: string, category: 'articles' | 'blog', id: string) {
    return `https://twitter.com/intent/tweet?text=${title}&url=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
  shareFacebook(category: 'articles' | 'blog', id: string) {
    return `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_CLIENT_URL}/${category}/${id}`;
  },
};
