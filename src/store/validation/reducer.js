import Immutable from 'seamless-immutable'
import * as types from './actionTypes'

const initialState = Immutable({
    errors:     {},
    errorFor:   function(input) {
        return this.failed && this.errors[input] ? this.errors[input][0] : ''
    },
    failed:     false,
    old:        {},
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.FAILED:
            return state.merge(action.validation)
        case types.CLEAR:
            return initialState
        default:
            return state
    }
}
