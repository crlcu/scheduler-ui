import { browserHistory } from 'react-router'

import * as types from './actionTypes'
import api from '../../services/tasks'

export const history = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const paginator = await api.history(id)

            dispatch({ type: types.HISTORY, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/tasks?page=' + page)
    }
}

export const search = (page = 0) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const paginator = await api.search({ page })

            dispatch({ type: types.SEARCH, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}

export const view = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const task = await api.view(id)

            dispatch({ type: types.VIEW, task })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}
