import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'material-symbols';

import { ProtectedOutlet } from './components';
import { LoginProtectedOutlet } from './pages/Login';

import './scss/styles.scss';
import { Layout } from './components/Layout';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home/Home'));
const Article = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Article/Article'));
const Editor = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Editor'));
const LoginPage = lazy(() => import(/* webpackChunkName: "Home" */ './pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "Home" */ './pages/NotFound'));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route element={<ProtectedOutlet />}>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/new" element={<Home />} />
                        <Route path="/removed" element={<Home />} />
                        <Route path="/blog" element={<Home />} />
                        <Route path="/blog/:id" element={<Article mode="blog" />} />
                        <Route path="/blog/new" element={<Editor />} />
                        <Route path="/blog/:id/edit" element={<Editor />} />
                        <Route path="/articles/:id" element={<Article mode="default" />} />
                        <Route path="/articles/:id/edit" element={<Editor />} />
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
