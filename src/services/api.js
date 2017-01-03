import base64 from 'base-64'

export default class Api {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl

        this.username = options.username
        this.password = options.password
    }

    getHeaders = () => {
        var headers = new Headers()

        headers.append('Authorization', 'Basic ' + base64.encode(this.username + ':' + this.password))
        headers.append('Accept', 'application/json')

        return headers
    }
}
