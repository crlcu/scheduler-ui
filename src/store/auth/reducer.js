import Immutable from 'seamless-immutable'
import ActionType from '../../models/ActionType'
import * as storage from '../../storage'

const actions = new ActionType('auth')

const initialState = Immutable({
    error:              '',
    isAuthenticated:    !!storage.get('token'),
    loading:            false,
    user:               JSON.parse(storage.get('user') || '{}')
})

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case actions.LOADING:
            return state.merge({
                loading: action.loading
            })
        case actions.LOGGED_IN:
            return state.merge({
                error:  '',
                user:   action.user
            })
        case actions.LOGIN_FAILURE:
            return state.merge({
                error:  action.error
            })
        case actions.LOGGED_OUT:
            return state.merge({
                error:  ''
            })
        default:
            return state
    }
}
