import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'material-symbols';

import CrossScreenModals from './components/CrossScreenModals';
import { Layout, Overlay } from './components';
import { AuthOutlet, PrivateOutlet, DraftsAndBookmarksOutlet } from './helpers';
import { useThemeMode } from './hooks';
import { useGetCurrentUserQuery } from './redux';

import './scss/styles.scss';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'));
const Articles = lazy(() => import(/* webpackChunkName: "Articles" */ './pages/Articles'));
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile/Profile'));
const Article = lazy(() => import(/* webpackChunkName: "Article" */ './pages/Article/Article'));
const ArticleEditorPage = lazy(() => import(/* webpackChunkName: "ArticleEditorPage" */ './pages/ArticleEditorPage'));
const LoginPage = lazy(() => import(/* webpackChunkName: "EmailPage" */ './pages/Auth/LoginPage'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Auth/SignupPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFound'));

const App = () => {
    const token = localStorage.getItem('token');
    useGetCurrentUserQuery('', { skip: !token });

    const { mode } = useThemeMode();

    useEffect(() => {
        if (mode === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkThemeMq.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.add('light');
            }
        }
    }, [mode]);

    return (
        <>
            <Suspense fallback={<Overlay />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/for_you" element={<Home />} />
                        <Route path="/following" element={<Home />} />
                        <Route path="search" element={<Articles />} />
                        <Route path="search/:category" element={<Articles />} />
                        <Route path="articles/:id" element={<Article />} />
                        <Route path="@:username" element={<Profile />} />
                        <Route path="@:username/articles" element={<Profile />} />
                        <Route path="@:username/appreciated" element={<Profile />} />
                        <Route element={<DraftsAndBookmarksOutlet />}>
                            <Route path="@:username/drafts" element={<Profile />} />
                            <Route path="@:username/bookmarks" element={<Profile />} />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route element={<PrivateOutlet />}>
                        <Route path="/articles/new" element={<ArticleEditorPage />} />
                        <Route path="/articles/:id/edit" element={<ArticleEditorPage />} />
                        <Route path="/drafts/:id/edit" element={<ArticleEditorPage />} />
                    </Route>
                    <Route element={<AuthOutlet />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </Suspense>
            <CrossScreenModals />
        </>
    );
};
export default App;
