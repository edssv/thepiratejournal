export const getPublicUrl = {
  home() {
    return '/';
  },
  login() {
    return '/login';
  },
  signup() {
    return '/signup';
  },
  search(query: string) {
    return query ? `/search?${query}` : '/search';
  },
  article(id: string | number) {
    return `/articles/${id}`;
  },
  articleEdit(id: string | number) {
    return `/articles/${id}/edit`;
  },
  blog(id: string) {
    return `/blog/${id}`;
  },
  blogPage() {
    return '/blog';
  },
  draftEdit(id: string | number) {
    return `/drafts/${id}/edit`;
  },
  profile(id: string | number) {
    return `/users/${id}`;
  },
  profileWithCategory(id: string | number, category: string) {
    return `/users/${id}/${category}`;
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
