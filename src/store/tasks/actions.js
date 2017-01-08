import { browserHistory } from 'react-router'
import ActionType from '../../models/ActionType'
import api from '../../services/tasks'

const actions = new ActionType('tasks')

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/tasks?page=' + page)
    }
}

export const search = (args = {}) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const paginator = await api.search(args)

            dispatch({ type: actions.SEARCH, paginator, search: args.search })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const view = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const task = await api.view(id)

            dispatch({ type: actions.VIEW, task })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}
