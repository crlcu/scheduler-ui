import { browserHistory } from 'react-router'

import * as types from './actionTypes'
import api from '../../../services/tasks/history'

export const changePage = (page) => {
    return (dispatch, getState) => {
        const state = getState()

        browserHistory.push('/tasks/' + state.tasks.task.id + '?page=' + page)
    }
}

export const search = (args = {}) => {
    return async(dispatch, getState, x) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const state = getState()

            const paginator = await api.search(state.tasks.task.id, args)

            dispatch({ type: types.SEARCH, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}
