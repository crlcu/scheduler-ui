import { browserHistory } from 'react-router'
import * as types from './actionTypes'
import api from '../../services/auth'

// Calls the API to get a token and
// dispatches actions along the way
export const login = (credentials) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOGGING_IN, credentials })
        
        try {
            const user = await api.login(credentials.email, credentials.pasword)
            
            // If login was successful, set the token in local storage
            localStorage.setItem('token', user.email)

            dispatch({ type: types.LOGGED_IN, user })

            // Redirect to tasks page
            browserHistory.push('/tasks')
        } catch (error) {
            console.error(error)

            dispatch({ type: types.LOGIN_FAILURE, error })
        }
    }
}

// Logs the user out
export const logout = () => {
    return dispatch => {
        // Remove the token from local storage
        localStorage.removeItem('token')
        
        dispatch({ type: types.LOGGED_OUT })

        // Redirect to login page
        browserHistory.push('/login')
    }
}
