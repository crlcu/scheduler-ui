import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    paginator: {
        data: []
    },
    search: '',
    role: {}
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.EDIT:
            return state.merge({
                role: action.role
            })
        case types.LOADING:
            return state.merge({
                loading: action.loading
            })
        case types.SEARCH:
            return state.merge({
                paginator:  action.paginator,
                search:     action.search || ''
            })
        case types.VIEW:
            return state.merge({
                role: action.role
            })
        case types.UPDATED:
            return state.merge({
                role: action.role
            })
        default:
            return state
    }
}
