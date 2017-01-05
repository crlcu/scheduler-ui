import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    paginator: {
        data: []
    },
    search: '',
    task: {}
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOADING:
            return state.merge({
                loading: action.loading
            })
        case types.HISTORY:
            return state.merge({
                paginator: action.paginator
            })
        case types.SEARCH:
            return state.merge({
                paginator:  action.paginator,
                search:     action.search || ''
            })
        case types.VIEW:
            return state.merge({
                task: action.task
            })
        default:
            return state
    }
}
