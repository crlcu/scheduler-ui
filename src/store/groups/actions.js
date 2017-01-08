import { browserHistory } from 'react-router'

import * as validation from '../validation/actionTypes'
import * as types from './actionTypes'
import api from '../../services/groups'

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/groups?page=' + page)
    }
}

export const create = (args) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const response = await api.create(args)

            if (response.success) {
                dispatch({ type: types.CREATED, group: response.data })
                
                // Redirect to groups page
                browserHistory.push('/groups')
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
            const group = await api.edit(id)

            dispatch({ type: types.EDIT, group })
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
                dispatch({ type: types.UPDATED, group: response.data })
                
                // Redirect to groups page
                browserHistory.push('/groups')
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
