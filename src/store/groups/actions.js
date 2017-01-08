import { browserHistory } from 'react-router'
import ActionType from '../../models/ActionType'
import api from '../../services/groups'

const actions = new ActionType('groups')
const validation = new ActionType('validation')

export const changePage = (page) => {
    return (dispatch, getState) => {
        browserHistory.push('/groups?page=' + page)
    }
}

export const create = (args) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const response = await api.create(args)

            if (response.success) {
                dispatch({ type: actions.CREATED, group: response.data })
                
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

        dispatch({ type: actions.LOADING, loading: false })
    }
}

export const edit = (id) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const group = await api.edit(id)

            dispatch({ type: actions.EDIT, group })
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
                dispatch({ type: actions.UPDATED, group: response.data })
                
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
