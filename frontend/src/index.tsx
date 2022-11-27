import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as Spectrum, lightTheme } from '@adobe/react-spectrum';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

import { ErrorFallback } from './components/ErrorFallback';

const root = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Spectrum
                theme={lightTheme}
                minHeight="100vh"
                height={'auto'}
                locale="ru-RU"
                UNSAFE_style={{ fontFamily: 'Roboto' }}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary>
            </Spectrum>
        </Provider>
    </BrowserRouter>,
);
