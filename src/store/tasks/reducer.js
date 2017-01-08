import Immutable from 'seamless-immutable'
import ActionType from '../../models/ActionType'

const actions = new ActionType('tasks')

const initialState = Immutable({
    paginator: {
        data: []
    },
    search: '',
    task: {}
})

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case actions.LOADING:
            return state.merge({
                loading: action.loading
            })
        case actions.SEARCH:
            return state.merge({
                paginator:  action.paginator,
                search:     action.search || ''
            })
        case actions.VIEW:
            return state.merge({
                task: action.task
            })
        default:
            return state
    }
}
