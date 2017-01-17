class ActionType {
    constructor(namespace) {
        this.LOADING = namespace + '.LOADING'
        
        this.CREATE = namespace + '.CREATE'
        this.STORED = namespace + '.STORED'
        this.EDIT = namespace + '.EDIT'
        this.UPDATED = namespace + '.UPDATED'
        
        this.SEARCH = namespace + '.SEARCH'
        this.VIEW = namespace + '.VIEW'

        this.FAILED = namespace + '.FAILED'
        this.CLEAR = namespace + '.CLEAR'

        this.LOGIN_FAILURE = namespace + '.LOGIN_FAILURE'
        this.LOGGED_IN = namespace + '.LOGGED_IN'
        this.LOGGED_OUT = namespace + '.LOGGED_OUT'
    }
}

export default ActionType
