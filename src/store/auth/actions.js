import { browserHistory } from 'react-router'
import * as types from './actionTypes'
import api from '../../services/auth'
import * as storage from '../../storage'

// Calls the API to get a token and
// dispatches actions along the way
export const login = (credentials) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOADING, loading: true })

        try {
            const response = await api.login(credentials.email, credentials.password)
            
            if ( response.success ) {
                // If login was successful, set the token in storage
                storage.put('token', response.token)

                // And set user details
                storage.put('user', JSON.stringify(response.user))

                dispatch({ type: types.LOGGED_IN, user: response.user })

                // Redirect to home page
                browserHistory.push('/')
            } else {
                dispatch({ type: types.LOGIN_FAILURE, error: { message: 'Invalid email or password.' } })
            }
        } catch (error) {
            console.error(error)

            dispatch({ type: types.LOGIN_FAILURE, error: { message: 'Invalid email or password.' } })
        }

        dispatch({ type: types.LOADING, loading: false })
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
        
        dispatch({ type: types.LOGGED_OUT })

        // Redirect to login page
        browserHistory.push('/login')
    }
}
