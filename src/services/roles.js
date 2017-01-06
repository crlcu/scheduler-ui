import queryString from 'query-string'
import Api from './api'

class Endpoint extends Api {
    async remove(id) {
        const url = `${this.baseUrl}/${id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        const data = await response.json()
        
        return data.data
    }

    async search(args = {}) {
        const url = this.baseUrl + '?' + queryString.stringify(args)

        const response = await fetch(url, {
            method:     'GET',
            headers:    this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        return await response.json()
    }

    async view(id) {
        const url = `${this.baseUrl}/${id}`

        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        const data = await response.json()
        
        return data.data
    }
}

export default new Endpoint('http://localhost:1337/dev.machine:8000/api/roles')
