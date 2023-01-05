import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
    Provider as SpectrumProvider,
    lightTheme,
    darkTheme,
    defaultTheme,
} from '@adobe/react-spectrum';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

import { ErrorFallback } from './components/ErrorFallback';

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
