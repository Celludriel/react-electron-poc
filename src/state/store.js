import {createStore, applyMiddleware, compose} from "redux";
import * as reducers from "./ducks";

export default function configureStore(initialState = {}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        () => {},
        initialState,
        composeEnhancers(applyMiddleware())
    );
}
