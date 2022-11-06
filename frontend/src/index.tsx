import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as Spectrum, defaultTheme, lightTheme } from '@adobe/react-spectrum';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { store } from './redux';

function ErrorFallback() {
    return (
        <div role="alert">
            <p>Ошибка</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <Spectrum theme={lightTheme} minHeight="100vh" height={'auto'}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary>
            </Spectrum>
        </Provider>
    </BrowserRouter>,
);
