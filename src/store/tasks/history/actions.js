import { browserHistory } from 'react-router'
import ActionType from '../../../models/ActionType'
import api from '../../../services/tasks/history'

const actions = new ActionType('tasks.history')

export const changePage = (page) => {
    return (dispatch, getState) => {
        const state = getState()

        browserHistory.push('/tasks/' + state.tasks.task.id + '?page=' + page)
    }
}

export const search = (args = {}) => {
    return async(dispatch, getState, x) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const state = getState()

            const paginator = await api.search(state.tasks.task.id, args)

            dispatch({ type: actions.SEARCH, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}
