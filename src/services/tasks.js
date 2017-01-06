import queryString from 'query-string'
import Api from './api'

class Tasks extends Api {
    async search(args = {}) {
        args.limit = 4;

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

export default new Tasks('http://localhost:1337/dev.machine:8000/api/tasks')
