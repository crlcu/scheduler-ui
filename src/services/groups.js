import queryString from 'query-string'
import Api from './api'

class Endpoint extends Api {
    async create(args) {
        const url = `${this.baseUrl}`

        const response = await fetch(url, {
            method:     'POST',
            headers:    this.getHeaders(),
            body:       queryString.stringify(args)
        })

        if (!response.ok) {
            switch(response.status) {
                case 422:
                    return {
                        reason: 'validation',
                        errors: await response.json()
                    }
                default:
                    throw new Error(`Request failed, HTTP status ${response.status}`)
            }
        }
        
        return await response.json()
    }

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

    async update(id, args) {
        const url = `${this.baseUrl}/${id}`

        const response = await fetch(url, {
            method:     'PUT',
            headers:    this.getHeaders(),
            body:       queryString.stringify(args)
        })

        if (!response.ok) {
            switch(response.status) {
                case 422:
                    return {
                        reason: 'validation',
                        errors: await response.json()
                    }
                default:
                    throw new Error(`Request failed, HTTP status ${response.status}`)
            }
        }
        
        return await response.json()
    }
}

export default new Endpoint('http://localhost:1337/dev.machine:8000/api/groups')
