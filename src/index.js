import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import auth from './auth'

import ActionType from './models/ActionType'
import * as reducers from './store/reducers'

import LoggedIn from './containers/LoggedIn'

import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'

import GroupsSearch from './components/Groups/Search'
import GroupsCreate from './components/Groups/Create'
import GroupsEdit from './components/Groups/Edit'

import Tasks from './containers/Tasks'
import TasksSearch from './components/Tasks/Search'
import TasksView from './components/Tasks/View'

import RolesSearch from './components/Roles/Search'
import RolesCreate from './components/Roles/Create'
import RolesEdit from './components/Roles/Edit'

import NotFound from './components/NotFound'

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

const validation = new ActionType('validation')

store.subscribe(function fetcher(a, b, c) {
    const state = store.getState()

    // Clear validation each time loading smth and validation failed
    if (state.lastAction.type.match(/loading/ig) && state.lastAction.loading && state.validation.failed) {
        store.dispatch({ type: validation.CLEAR })
    }
})

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={ store }>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={ history}>
            <Route path="login" component={ Login } />

            <Route component={ LoggedIn } onEnter={ (nextState, replace) => auth.check(nextState, replace) }>
                <Route path="/" component={ Tasks}>
                    <IndexRoute component={ TasksSearch } />
                </Route>

                <Route path="/tasks" component={ Tasks}>
                    <IndexRoute component={ TasksSearch } />

                    <Route path="/" component={ TasksSearch } />
                    
                    <Route path=":id">
                        <IndexRoute component={ TasksView } />

                        <Route path="edit" component={ TasksView } />
                        <Route path="notifications" component={ TasksView } />
                        <Route path="delete" component={ TasksView } />
                    </Route>
                </Route>

                <Route path="/timeline" component={ TasksSearch } onEnter={ (nextState, replace) => auth.hasRole(nextState, replace, 'has-timeline') } />
                
                <Route path="/groups" onEnter={ (nextState, replace) => auth.hasRole(nextState, replace, 'manage-groups') }>
                    <IndexRoute component={ GroupsSearch } />

                    <Route path="create" component={ GroupsCreate } />
                    <Route path=":id/edit" component={ GroupsEdit } />
                </Route>

                <Route path="/roles" onEnter={ (nextState, replace) => auth.hasRole(nextState, replace, 'manage-roles') }>
                    <IndexRoute component={ RolesSearch } />

                    <Route path="create" component={ RolesCreate } />
                    <Route path=":id/edit" component={ RolesEdit } />
                </Route>

                <Route path="logout" component={ Logout } />
            </Route>

            <Route path="*" component={ NotFound } />
        </Router>
    </Provider>,
    document.getElementById('root')
)
