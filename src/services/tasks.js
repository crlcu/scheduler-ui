import Api from './api'

class Tasks extends Api {
    async history(id, args = {}) {
        const url = `${this.baseUrl}/${id}/executions?page=${args.page}`

        const response = await fetch(url, {
            method:     'GET',
            headers:    this.getHeaders()
        })

        if (!response.ok) {
            throw new Error(`Request failed, HTTP status ${response.status}`)
        }
        
        return await response.json()
    }

    async search(args = {}) {
        const url = `${this.baseUrl}?page=${args.page}&limit=4`

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

export default new Tasks('http://localhost:1337/dev.machine:8000/api/tasks', {
    username: 'admin@tasks-scheduler.com',
    password: 'access88'
})
