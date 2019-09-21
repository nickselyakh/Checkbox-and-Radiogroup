import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createStore, {
        Reducers,
        Middlewares } from "Store"
import { Provider } from "react-redux"
import { createBrowserHistory } from "history"
import { ConnectedRouter,
    connectRouter,
    routerMiddleware } from "connected-react-router"

import App from "./app"


const history = createBrowserHistory({
    forceRefresh: false
})


const Store = createStore(
    Reducers({
        router: connectRouter(history)
    })
)(
    Middlewares([
        routerMiddleware(history)
    ])
)

ReactDOM.render(
    <Provider store={Store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>

    , document.getElementById('root')
  );