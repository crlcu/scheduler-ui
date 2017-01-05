import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    error:              '',
    isAuthenticated:    localStorage.getItem('id_token') ? true : false,
    isFetching:         false,
    user:               {}
})

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGGING_IN:
            return state.merge({
                error:              '',
                isAuthenticated:    false,
                isFetching:         true
            })
        case types.LOGGED_IN:
            return state.merge({
                error:              '',
                isAuthenticated:    true,
                isFetching:         false,
                user:               action.user
            })
        case types.LOGIN_FAILURE:
            return state.merge({
                error:              action.error,
                isAuthenticated:    false,
                isFetching:         false
            })
        case types.LOGGED_OUT:
            return state.merge({
                error:              '',
                isAuthenticated:    false,
                isFetching:         true
            })
        default:
            return state
    }
}
