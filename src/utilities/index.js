
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import ErrorBoundary from './ErrorBoundary';

const options = {
    timeout: 5000,
    offset: '30px',
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE
};


ReactDOM.render(
    <Provider store={store}>

        <ErrorBoundary>
            <AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>
        </ErrorBoundary>

    </Provider>,
    document.getElementById('root')
);
