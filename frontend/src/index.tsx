import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './redux/store';
import App from './App';
import { ErrorFallback, ScrollToTop } from './components';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ScrollToTop />
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}>
                    <App />
                </GoogleOAuthProvider>
            </ErrorBoundary>
        </Provider>
    </BrowserRouter>
);
