import * as types from './actionTypes'
import api from '../../services/auth'

const loginError = (message) => {
    return {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export const loginUser = (credentials) => {
    return async(dispatch, getState) => {
        dispatch({ type: types.LOGGING_IN, credentials })
        
        try {
            const user = await api.login(credentials.email, credentials.pasword)

            // If login was successful, set the token in local storage
            //localStorage.setItem('id_token', user.id_token)

            dispatch({ type: types.LOGGED_IN, user })
        } catch (error) {
            console.error(error)

            dispatch({ type: types.LOGIN_FAILURE, error })
        }
    }
}

// Logs the user out
export const logoutUser = () => {
    return dispatch => {
        dispatch({ type: types.LOGGED_OUT, true })
        //localStorage.removeItem('id_token')
    }
}
