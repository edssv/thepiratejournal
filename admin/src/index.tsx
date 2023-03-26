import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './redux';

const root = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);
root.render(
    <BrowserRouter basename="/control">
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}>
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </BrowserRouter>
);
