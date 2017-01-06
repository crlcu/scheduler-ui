import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import auth from './auth'

import * as reducers from './store/reducers'
import LoggedIn from './containers/LoggedIn'

import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Tasks from './containers/Tasks'
import TasksSearch from './components/Tasks/Search'
import TasksView from './components/Tasks/View'

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(...middleware)
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="login" component={Login} />

            <Route path="/" component={LoggedIn} onEnter={(nextState, replace) => auth.check(nextState, replace)}>
                <Route path="logout" component={Logout} />

                <Route path="/tasks" component={Tasks}>
                    <IndexRoute component={TasksSearch} />

                    <Route path="/" component={TasksSearch} />
                    
                    <Route path=":id">
                        <IndexRoute component={TasksView} />

                        <Route path="edit" component={TasksView} />
                        <Route path="notifications" component={TasksView} />
                        <Route path="delete" component={TasksView} />
                    </Route>
                </Route>
                <Route path="/timeline" component={TasksSearch} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
