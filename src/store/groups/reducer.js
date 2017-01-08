import Immutable from 'seamless-immutable'
import ActionType from '../../models/ActionType'

const actions = new ActionType('groups')

const initialState = Immutable({
    loading: false,
    paginator: {
        data: []
    },
    group: {},
    search: ''
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case actions.EDIT:
            return state.merge({
                group: action.group
            })
        case actions.LOADING:
            return state.merge({
                loading: action.loading
            })
        case actions.SEARCH:
            return state.merge({
                paginator:  action.paginator,
                search:     action.search || ''
            })
        case actions.UPDATED:
            return state.merge({
                group: action.group
            })
        default:
            return state
    }
}
