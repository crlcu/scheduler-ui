import Immutable from 'seamless-immutable'
import ActionType from '../../models/ActionType'

const actions = new ActionType('validation')

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
        case actions.FAILED:
            return state.merge(action.validation)
        case actions.CLEAR:
            return initialState
        default:
            return state
    }
}
