import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import { createBrowserHistory } from 'history';
import { createStore, combineReducers } from "redux";
import { Provider, connect } from 'react-redux'
import { LocalizeProvider, localizeReducer } from "react-localize-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux store
const store = createStore(
    combineReducers({
        localize: localizeReducer
    })
)

// Create an enhanced history that syncs navigation events with the store
// const history = createBrowserHistory()

//DOM render
ReactDOM.render(    
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <Router basename="/app/hw-react">
                <Switch>
                    <Route path="/:lang" component={App} />
                    <Route path="/" component={App} />
                </Switch>
            </Router>
        </LocalizeProvider>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
