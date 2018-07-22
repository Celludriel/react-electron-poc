import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import './index.css';
import App from './views/App';
import configureStore from "./state/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <App/>
    </ReduxProvider>,
    document.getElementById('root')
);
