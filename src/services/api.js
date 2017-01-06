import base64 from 'base-64'
import * as storage from '../storage'

export default class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl

        this.email = storage.get('email')
        this.password = storage.get('password')
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
