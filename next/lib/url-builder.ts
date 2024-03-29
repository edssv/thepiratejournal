export enum UrlTemplates {
  Main = '/',
  Subscriptions = '/subscriptions',
  History = '/history',
  Bookmarks = '/bookmarks',
  Blog = '/blog',
  BlogPost = '/blog/:id',
  Search = '/search',
  SearchCategory = '/search/:category',
  Article = '/articles/:id',
  Profile = '/@:username',
  ProfileArticles = '/@:username/articles',
  ProfileAppreciated = '/@:username/appreciated',
  ProfileDrafts = '/@:username/drafts',
  ProfileBookmarks = '/@:username/bookmarks',
  EditorNew = '/articles/new',
  EditorEdit = '/articles/:id/edit',
  EditorDraft = '/drafts/:id/edit',
  Login = '/login',
  Signup = '/signup'
}
