import base64 from 'base-64'

export default class Api {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl

        this.email = options.email
        this.password = options.password
    }

    getHeaders = () => {
        var headers = new Headers()
        
        headers.append('Accept', 'application/json')

        if (this.email) {
            headers.append('Authorization', 'Basic ' + base64.encode(this.email + ':' + this.password))
        }

        return headers
    }
}
