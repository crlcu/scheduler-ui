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
    }
}
