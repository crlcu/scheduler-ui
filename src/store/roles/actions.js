import { browserHistory } from 'react-router'
import ActionType from '../../models/ActionType'
import api from '../../services/roles'

const actions = new ActionType('roles')
const validation = new ActionType('validation')

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/roles?page=' + page)
    }
}

export const create = (args) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const response = await api.create(args)

            if (response.success) {
                dispatch({ type: actions.CREATED, role: response.data })
                
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

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const edit = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const role = await api.edit(id)

            dispatch({ type: actions.EDIT, role })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const update = (id, args) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const response = await api.update(id, args)

            if (response.success) {
                dispatch({ type: actions.UPDATED, role: response.data })
                
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

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const search = (args = {}) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const paginator = await api.search(args)

            dispatch({ type: actions.SEARCH, paginator })
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const remove = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            await api.remove(id)

            dispatch(search())
        } catch (error) {
            console.error(error)
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}
