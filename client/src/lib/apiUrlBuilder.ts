export const ApiUrlBuilder = {
  Login: '/auth/login',
  Signup: '/auth/signup',
  Logout: '/auth/logout',
  Refresh: '/auth/refresh',
  Profile: '/auth/profile',
  Articles: '/articles',
  ArticlesSearch: '/articles/search',
  ArticlesTags: '/articles/tags',
  ArticlesPopular: '/articles/popular',
  ArticlesBestOfWeek: '/articles/week',
  Blog: '/blog',
  Users: '/users',
};

export const getApiUrl = {
  googleLogin() {
    return '/auth/google/login';
  },
  googleOneTap() {
    return '/auth/google/onetap';
  },
  getUsers() {
    return '/users';
  },
  getUser(id: string, articles: string) {
    return `/users/${id}/${articles}`;
  },
  followUser(id: string) {
    return `/users/${id}/followers`;
  },
  getArticle(id: string) {
    return `/articles/${id}`;
  },
  createArticle() {
    return '/articles';
  },
  updateArticle(id: string) {
    return `/articles/${id}`;
  },
  deleteArticle(id: string) {
    return `/articles/${id}`;
  },
  updateBlog(id: string) {
    return `/blog/${id}`;
  },
  deleteBlog(id: string) {
    return `/blog/${id}`;
  },
  getOneDraft(id: string) {
    return `/drafts/${id}`;
  },
  createDraft() {
    return '/drafts';
  },
  updateDraft(id: string) {
    return `/drafts/${id}`;
  },
  deleteDraft(id: string) {
    return `/drafts/${id}`;
  },
  likeArticle(id: string) {
    return `/articles/${id}/likes`;
  },
  removeLikeArticle(id: string) {
    return `/articles/${id}/likes`;
  },
  bookmark(id: string) {
    return `/articles/${id}/bookmarks`;
  },
  fileUpload() {
    return '/files/upload';
  },
  search(query: string) {
    return `/articles/search/?${query}`;
  },
};
