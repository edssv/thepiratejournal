import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'material-symbols';

import { ProtectedOutlet } from './components';
import { LoginProtectedOutlet } from './pages/Login';
import { useGetCurrentUserQuery } from './redux';

import './scss/styles.scss';
import { Layout } from './components/Layout';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'));
const Article = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Article/Article'));
const ArticleEditorPage = lazy(() => import(/* webpackChunkName: "Home" */ './pages/ArticleEditorPage'));
const LoginPage = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Login/Login'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "Home" */ './pages/NotFound'));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route element={<ProtectedOutlet />}>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/articles/:id" element={<Article />} />
                        <Route path="/articles/:id/edit" element={<ArticleEditorPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Route>
                <Route element={<LoginProtectedOutlet />}>
                    <Route path="login" element={<LoginPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
