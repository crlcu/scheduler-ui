import Immutable from 'seamless-immutable'
import * as types from './actionTypes'
import * as storage from '../../storage'

const initialState = Immutable({
    error:              '',
    isAuthenticated:    storage.get('token') ? true : false,
    isFetching:         false,
    user:               JSON.parse(storage.get('user') || '{}')
})

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
