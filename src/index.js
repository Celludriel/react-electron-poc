import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './views/App';
import configureStore from "./state/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
    <ReduxProvider store={reduxStore}>
        <MuiThemeProvider>            
            <App/>
        </MuiThemeProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
