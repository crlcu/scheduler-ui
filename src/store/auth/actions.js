import { browserHistory } from 'react-router'
import ActionType from '../../models/ActionType'
import api from '../../services/auth'
import * as storage from '../../storage'

const actions = new ActionType('auth')

// Calls the API to get a token and
// dispatches actions along the way
export const login = (credentials) => {
    return async(dispatch, getState) => {
        dispatch({ type: actions.LOADING, loading: true })

        try {
            const response = await api.login(credentials.email, credentials.password)
            
            if ( response.success ) {
                // If login was successful, set the token in storage
                storage.put('token', response.token)

                // And set user details
                storage.put('user', JSON.stringify(response.user))

                dispatch({ type: actions.LOGGED_IN, user: response.user })

                // Redirect to home page
                browserHistory.push('/')
            } else {
                dispatch({ type: actions.LOGIN_FAILURE, error: { message: 'Invalid email or password.' } })
            }
        } catch (error) {
            console.error(error)

            dispatch({ type: actions.LOGIN_FAILURE, error: { message: 'Invalid email or password.' } })
        }

        dispatch({ type: actions.LOADING, loading: false })
    }
}

// Logs the user out
export const logout = () => {
    return async(dispatch, getState) => {
        try {
            await api.logout()
        } catch (error) {
            console.error(error)
        }

        // Clear the storage
        storage.clear()
        
        dispatch({ type: actions.LOGGED_OUT })

        // Redirect to login page
        browserHistory.push('/login')
    }
}
