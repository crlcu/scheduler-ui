import { browserHistory } from 'react-router'

import * as types from './actionTypes'
import api from '../../services/roles'

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/roles?page=' + page)
    }
}

export const create = (args) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const role = await api.create(args)

            dispatch({ type: types.CREATED, role })
            
            // Redirect to roles page
            browserHistory.push('/roles')
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}

export const edit = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const role = await api.edit(id)

            dispatch({ type: types.EDIT, role })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}

export const update = (id, args) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const role = await api.update(id, args)

            dispatch({ type: types.UPDATED, role })
            
            // Redirect to roles page
            browserHistory.push('/roles')
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

export const remove = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            await api.remove(id)

            dispatch(search())
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: types.LOADING, loading: false })
    }
}
