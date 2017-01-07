import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    loading: false,
    paginator: {
        data: []
    },
    role: {},
    search: ''
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
        case types.UPDATED:
            return state.merge({
                role: action.role
            })
        case types.VIEW:
            return state.merge({
                role: action.role
            })
        default:
            return state
    }
}
