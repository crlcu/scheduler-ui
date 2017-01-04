import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    paginator: {
        data: []
    }
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOADING:
            return state.merge({
                loading: action.loading
            })
        case types.SEARCH:
            return state.merge({
                paginator: action.paginator
            })
        default:
            return state
    }
}
