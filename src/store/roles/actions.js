import { browserHistory } from 'react-router'

import * as validation from '../validation/actionTypes'
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
            const response = await api.create(args)

            if (response.success) {
                dispatch({ type: types.CREATED, role: response.data })
                
                // Redirect to roles page
                browserHistory.push('/roles')
            } else {
                switch(response.reason) {
                    case 'validation':
                        dispatch({
                            type: validation.FAILED,
                            validation: {
                                errors: response.errors,
                                old: args,
                                failed: true 
                            }
                        })
                        break
                    default:
                        console.log(response)
                }
            }
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
            const response = await api.update(id, args)

            if (response.success) {
                dispatch({ type: types.UPDATED, role: response.data })
                
                // Redirect to roles page
                browserHistory.push('/roles')
            } else {
                switch(response.reason) {
                    case 'validation':
                        dispatch({
                            type: validation.FAILED,
                            validation: {
                                errors: response.errors,
                                old: args,
                                failed: true 
                            }
                        })
                        break
                    default:
                        console.log(response)
                }
            }
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
