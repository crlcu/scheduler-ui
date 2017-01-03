import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    isFetching:         false,
    isAuthenticated:    localStorage.getItem('id_token') ? true : false
})

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case types.LOGIN_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case types.LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case types.LOGOUT_SUCCESS:
            return state.merge({
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}
