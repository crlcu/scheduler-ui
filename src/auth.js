import * as storage from './storage'

module.exports = {
    loggedIn() {
        return !!storage.get('token')
    },

    check(nextState, replace) {
        if (!this.loggedIn()) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
    },

    hasRole(nextState, replace, role) {
        const user = JSON.parse(storage.get('user'))

        if (user.roles.indexOf(role) < 0) {
            this.notAuthorized(nextState, replace)
        }
    },

    notAuthorized(nextState, replace) {
        replace({
            pathname: '/not-allowed',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
