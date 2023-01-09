import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './redux/store';
import App from './App';
import { ErrorFallback } from './components';

const root = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <App />
            </ErrorBoundary>
        </Provider>
    </BrowserRouter>,
);
