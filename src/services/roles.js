import queryString from 'query-string'
import Api from './api'

class Endpoint extends Api {
    async edit(id) {
        const url = `${this.baseUrl}/${id}/edit`

        const response = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        return await response.json()
    }

    async update(id, args) {
        const url = `${this.baseUrl}/${id}`

        const headers = this.getHeaders()
        headers.append('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')

        const response = await fetch(url, {
            method:     'PUT',
            headers:    headers,
            body:       queryString.stringify(args)
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        return await response.json()
    }

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
