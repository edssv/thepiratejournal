import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthOutlet } from './helpers/AuthOutlet';
import { PrivateOutlet } from './helpers/PrivateOutlet';
import { useAuth } from './hooks/useAuth';
import { useCheckAuthQuery } from './redux/services/auth';

import './scss/styles.scss';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const GamesPage = React.lazy(() => import(/* webpackChunkName: "GamesPage" */ './pages/GamesPage'));
const GamePage = React.lazy(() => import(/* webpackChunkName: "GamePage" */ './pages/GamePage'));
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile'));
const Article = React.lazy(() => import(/* webpackChunkName: "Article" */ './pages/Article'));
const ArticleEditorPage = React.lazy(
    () => import(/* webpackChunkName: "ArticleEditorPage" */ './pages/ArticleEditorPage'),
);
const EmailPage = React.lazy(
    () => import(/* webpackChunkName: "EmailPage" */ './pages/EmailPage/index.jsx'),
);
const Signup = React.lazy(() => import(/* webpackChunkName: "Signup" */ './pages/Signup'));
const NotFoundPage = React.lazy(
    () => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage'),
);

const App = () => {
    const token = localStorage.getItem('token');
    const { data, isLoading } = useCheckAuthQuery(token && '');

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <Suspense fallback="loading">
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="games"
                    element={
                        <Suspense fallback="loading">
                            <GamesPage />
                        </Suspense>
                    }
                />
                <Route
                    path="games/metro-exodus"
                    element={
                        <Suspense fallback="loading">
                            <GamePage />
                        </Suspense>
                    }
                />
                {/* <Route element={<PrivateOutlet />}>
                    <Route
                        path="/profile"
                        element={
                            <Suspense fallback="loading">
                                <Profile />
                            </Suspense>
                        }
                    />
                </Route> */}
                <Route
                    path="/users/:id"
                    element={
                        <Suspense fallback="loading">
                            <Profile />
                        </Suspense>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <Suspense fallback="loading">
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="articles/:id"
                element={
                    <Suspense fallback="loading">
                        <Article />
                    </Suspense>
                }
            />

            <Route element={<PrivateOutlet />}>
                <Route
                    path="/article_edit"
                    element={
                        <Suspense fallback="loading">
                            <ArticleEditorPage />
                        </Suspense>
                    }
                />
            </Route>
            <Route element={<AuthOutlet />}>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback="loading">
                            <EmailPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Suspense fallback="loading">
                            <Signup />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};
export default App;
