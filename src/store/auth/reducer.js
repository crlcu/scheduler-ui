import Immutable from 'seamless-immutable'
import * as types from './actionTypes'
import * as storage from '../../storage'

const initialState = Immutable({
    error:              '',
    isAuthenticated:    !!storage.get('token'),
    loading:            false,
    user:               JSON.parse(storage.get('user') || '{}')
})

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOADING:
            return state.merge({
                loading: action.loading
            })
        case types.LOGGED_IN:
            return state.merge({
                error:  '',
                user:   action.user
            })
        case types.LOGIN_FAILURE:
            return state.merge({
                error:  action.error
            })
        case types.LOGGED_OUT:
            return state.merge({
                error:  ''
            })
        default:
            return state
    }
}
