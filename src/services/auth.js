import queryString from 'query-string'
import Api from './api'

class Auth extends Api {
    async login(email, password) {
        const url = this.baseUrl + '/login'

        const response = await fetch(url, {
            method:     'POST',
            headers:    this.getHeaders(),
            body:       queryString.stringify({
                email:      email,
                password:   password
            })
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }

        return await response.json()
    }

    async logout() {
        const url = this.baseUrl + '/logout'

        const response = await fetch(url, {
            method:     'GET',
            headers:    this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }

        return await response.json()
    }
}

export default new Auth('http://localhost:1337/dev.machine:8000/api')
