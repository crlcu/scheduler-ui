import * as storage from '../storage'

export default class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.token = storage.get('token')
    }

    getHeaders = () => {
        var headers = new Headers()
        
        headers.append('Accept', 'application/json')
        headers.append('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')

        if (this.token) {
            headers.append('Authorization', 'Bearer ' + this.token)
        }

        return headers
    }
}
