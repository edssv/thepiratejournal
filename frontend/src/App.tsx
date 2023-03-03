import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'material-symbols';

import { UrlTemplates } from './lib/urlBuilder';
import { useTheme } from './hooks';
import CrossScreensSnackbars from './components/Snackbars/CrossScreensSnackbars';
import { Layout, Login } from './components';
import { AuthOutlet, PrivateOutlet } from './components';
import { DraftsAndBookmarksOutlet } from './pages/Profile';

import './scss/styles.scss';
import Subscriptions from './pages/Subscriptions/Subscriptions';

const HomeScreen = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'));
const ArticlesScreen = lazy(() => import(/* webpackChunkName: "Articles" */ './pages/Articles'));
const ProfileScreen = lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile/Profile'));
const ArticleScreen = lazy(() => import(/* webpackChunkName: "Article" */ './pages/Article/Article'));
const EditorScreen = lazy(() => import(/* webpackChunkName: "ArticleEditorPage" */ './pages/Editor'));
const LoginScreen = lazy(() => import(/* webpackChunkName: "EmailPage" */ './pages/Auth/LoginPage'));
const SignupScreen = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Auth/SignupPage'));
// const Subscriptions = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Subscriptions/Subscriptions'));
const HistoryScreen = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/History/History'));
const BookmarksScreen = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Bookmarks/Bookmarks'));
const NotFoundScreen = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

const Navigator = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path={UrlTemplates.Main} element={<Layout />}>
                    <Route index element={<HomeScreen />} />
                    <Route path={UrlTemplates.Subscriptions} element={<Subscriptions />} />
                    <Route path={UrlTemplates.History} element={<HistoryScreen />} />
                    <Route path={UrlTemplates.Bookmarks} element={<BookmarksScreen />} />
                    <Route path={UrlTemplates.Search} element={<ArticlesScreen />} />
                    <Route path={UrlTemplates.SearchCategory} element={<ArticlesScreen />} />
                    <Route path={UrlTemplates.Article} element={<ArticleScreen />} />
                    <Route path={UrlTemplates.Profile} element={<ProfileScreen />} />
                    <Route path={UrlTemplates.ProfileArticles} element={<ProfileScreen />} />
                    <Route path={UrlTemplates.ProfileAppreciated} element={<ProfileScreen />} />
                    <Route element={<DraftsAndBookmarksOutlet />}>
                        <Route path={UrlTemplates.ProfileBookmarks} element={<ProfileScreen />} />
                        <Route path={UrlTemplates.ProfileDrafts} element={<ProfileScreen />} />
                    </Route>
                    <Route path="*" element={<NotFoundScreen />} />
                </Route>
                <Route element={<PrivateOutlet />}>
                    <Route path={UrlTemplates.EditorNew} element={<EditorScreen />} />
                    <Route path={UrlTemplates.EditorEdit} element={<EditorScreen />} />
                    <Route path={UrlTemplates.EditorDraft} element={<EditorScreen />} />
                </Route>
                <Route element={<AuthOutlet />}>
                    <Route path={UrlTemplates.Login} element={<LoginScreen />} />
                    <Route path={UrlTemplates.Signup} element={<SignupScreen />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

const App = () => {
    useTheme();

    return (
        <>
            <Navigator />
            <CrossScreensSnackbars />
            <Login />
        </>
    );
};
export default App;
