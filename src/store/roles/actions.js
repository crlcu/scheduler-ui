import { browserHistory } from 'react-router'

import * as types from './actionTypes'
import api from '../../services/roles'

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/roles?page=' + page)
    }
}

export const remove = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const response = await api.remove(id)

            dispatch(search())
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}

export const search = (args = {}) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const paginator = await api.search(args)

            dispatch({ type: types.SEARCH, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}
