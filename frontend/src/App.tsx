import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'material-symbols';

import { UrlTemplates } from './lib/urlBuilder';
import { useTheme } from './hooks';
import CrossScreensSnackbars from './components/Snackbars/CrossScreensSnackbars';
import { Layout, Login } from './components';
import { AuthOutlet, PrivateOutlet } from './components';
import { DraftsAndBookmarksOutlet } from './pages/Profile';
import SubscriptionsScreen from './pages/Subscriptions/Subscriptions';
import HistoryScreen from './pages/History/History';
import BookmarksScreen from './pages/Bookmarks/Bookmarks';
import ArticleScreen from './pages/Article/Article';
import ProfileScreen from './pages/Profile/Profile';

import './scss/styles.scss';

const HomeScreen = lazy(() => import(/* webpackChunkName: "HomeScreen" */ './pages/Home/Home'));
const ArticlesScreen = lazy(() => import(/* webpackChunkName: "ArticlesScreen" */ './pages/Articles'));
const EditorScreen = lazy(() => import(/* webpackChunkName: "EditorScreen" */ './pages/Editor'));
const AuthScreen = lazy(() => import(/* webpackChunkName: "AuthScreen" */ './pages/Auth/Auth'));
const NotFoundScreen = lazy(() => import(/* webpackChunkName: "NotFoundScreen" */ './pages/NotFound'));

const Navigator = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path={UrlTemplates.Main} element={<Layout />}>
                    <Route index element={<HomeScreen />} />
                    <Route path={UrlTemplates.Subscriptions} element={<SubscriptionsScreen />} />
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
                    <Route path={UrlTemplates.Login} element={<AuthScreen />} />
                    <Route path={UrlTemplates.Signup} element={<AuthScreen />} />
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
